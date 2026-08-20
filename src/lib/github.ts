import { Octokit } from "@octokit/rest";

export function getOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken });
}

export async function getUserRepos(accessToken: string) {
  const octokit = getOctokit(accessToken);
  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 20,
  });
  return data;
}

export async function getRepoIssuesAndPRs(
  accessToken: string,
  owner: string,
  repo: string
) {
  const octokit = getOctokit(accessToken);
  const { data } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
    per_page: 30,
  });
  return data;
}

export async function getUserRecentActivity(
  accessToken: string,
  username: string
) {
  const octokit = getOctokit(accessToken);
  const { data } = await octokit.activity.listPublicEventsForUser({
    username,
    per_page: 15,
  });
  return data;
}
