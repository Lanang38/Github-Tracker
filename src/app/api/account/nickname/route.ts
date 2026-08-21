import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

const MAX_NICKNAME_LENGTH = 32;

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
      { projection: { nickname: 1, name: 1, _id: 0 } },
    );

  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    nickname: user.nickname ?? user.name ?? '',
  });
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const nickname =
    typeof body?.nickname === 'string' ? body.nickname.trim() : '';

  if (!nickname) {
    return NextResponse.json(
      { error: 'Nickname is required' },
      { status: 400 },
    );
  }

  if (nickname.length > MAX_NICKNAME_LENGTH) {
    return NextResponse.json(
      { error: `Nickname must be ${MAX_NICKNAME_LENGTH} characters or fewer` },
      { status: 400 },
    );
  }

  const client = await clientPromise;
  const db = client.db();

  await db
    .collection('users')
    .updateOne({ _id: new ObjectId(session.user.id) }, { $set: { nickname } });

  return NextResponse.json({ nickname });
}
