interface DohAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DohResponse {
  Status: number;
  Answer?: DohAnswer[];
}

const DOH_ENDPOINTS: Array<(name: string, type: string) => string> = [
  (name, type) =>
    `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
  (name, type) =>
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`,
];

async function dohQuery(
  name: string,
  type: 'SRV' | 'TXT',
): Promise<DohAnswer[]> {
  let lastError: unknown;

  for (const buildUrl of DOH_ENDPOINTS) {
    try {
      const res = await fetch(buildUrl(name, type), {
        headers: { accept: 'application/dns-json' },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok)
        throw new Error(`DoH request failed with status ${res.status}`);
      const json = (await res.json()) as DohResponse;
      if (json.Status !== 0 || !json.Answer) return [];
      return json.Answer;
    } catch (err) {
      lastError = err;
      // try next DoH endpoint
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(`DoH query failed for ${name} (${type})`);
}

function parseSrvTarget(data: string) {
  // SRV record data format: "<priority> <weight> <port> <target>"
  const parts = data.trim().split(/\s+/);
  const port = parts[2];
  let target = parts[3] ?? '';
  if (target.endsWith('.')) target = target.slice(0, -1);
  return { port, target };
}

export async function resolveMongoSrvUri(srvUri: string): Promise<string> {
  if (!srvUri.startsWith('mongodb+srv://')) {
    return srvUri;
  }

  try {
    const url = new URL(srvUri);
    const host = url.hostname; // e.g. cluster0.xxxxx.mongodb.net
    const auth = url.username
      ? `${url.username}${url.password ? `:${url.password}` : ''}@`
      : '';
    const dbAndQuery = `${url.pathname}${url.search}`;

    const srvAnswers = await dohQuery(`_mongodb._tcp.${host}`, 'SRV');
    if (srvAnswers.length === 0) {
      throw new Error(`No SRV records found for _mongodb._tcp.${host}`);
    }

    const hosts = srvAnswers
      .map((a) => parseSrvTarget(a.data))
      .filter((h) => h.target)
      .map((h) => `${h.target}:${h.port}`)
      .join(',');

    // Atlas publishes extra required options (replicaSet, authSource) via a TXT record
    let extraParams = '';
    try {
      const txtAnswers = await dohQuery(host, 'TXT');
      const txt = txtAnswers[0]?.data?.replace(/"/g, '');
      if (txt) extraParams = `&${txt}`;
    } catch {
      // TXT lookup is best-effort; continue without it if it fails
    }

    const separator = dbAndQuery.includes('?') ? '&' : '?';
    return `mongodb://${auth}${hosts}${dbAndQuery}${separator}ssl=true${extraParams}`;
  } catch (err) {
    console.warn(
      '[dns-over-https] Failed to resolve mongodb+srv:// via DoH, falling back to native resolution:',
      err instanceof Error ? err.message : err,
    );
    return srvUri;
  }
}
