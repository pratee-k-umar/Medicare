import { connectToDB } from '@/utils/database';

export async function GET() {
  try {
    await connectToDB();
    return new Response(JSON.stringify({ status: 'ok' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ status: 'error', message: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
