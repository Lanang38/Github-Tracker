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

  const user = await db
    .collection('users')
    .findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { email: 1, _id: 0 } },
    );

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    confirmValue: user.email ?? '',
  });
}
