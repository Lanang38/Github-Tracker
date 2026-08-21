import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const accounts = await db
    .collection('accounts')
    .find({ userId: new ObjectId(session.user.id) })
    .project({ provider: 1, _id: 0 })
    .toArray();

  return NextResponse.json({
    providers: accounts.map((a) => a.provider as string),
  });
}
