import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { getUserRepos } from '@/lib/github';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const githubAccount = await db.collection('accounts').findOne({
    userId: new ObjectId(session.user.id),
    provider: 'github',
  });

  if (!githubAccount?.access_token) {
    return NextResponse.json(
      { error: 'GitHub account not connected', code: 'GITHUB_NOT_CONNECTED' },
      { status: 409 },
    );
  }

  try {
    const repos = await getUserRepos(githubAccount.access_token as string);

    return NextResponse.json({
      repositories: repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        private: repo.private,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.updated_at,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch repositories from GitHub' },
      { status: 502 },
    );
  }
}
