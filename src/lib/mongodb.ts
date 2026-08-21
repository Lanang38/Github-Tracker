import { MongoClient } from 'mongodb';
import { resolveMongoSrvUri } from '@/lib/resolve-mongodb-srv';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable in .env.local',
  );
}

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

async function createClient() {
  // Resolve mongodb+srv:// via DNS-over-HTTPS first — avoids native UDP DNS
  // queries that some networks block entirely (see resolve-mongodb-srv.ts)
  const resolvedUri = await resolveMongoSrvUri(uri);
  const client = new MongoClient(resolvedUri);
  return client.connect();
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClient();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClient();
}

export default clientPromise;
