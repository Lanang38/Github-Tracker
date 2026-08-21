import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

export async function DELETE() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();
  const userId = new ObjectId(session.user.id);

  await Promise.all([
    db.collection('accounts').deleteMany({ userId }),
    db.collection('sessions').deleteMany({ userId }),
    db.collection('users').deleteOne({ _id: userId }),
  ]);

  return NextResponse.json({ success: true });
}
