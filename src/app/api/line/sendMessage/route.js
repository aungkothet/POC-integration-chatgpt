import sendLineReply from '@/_actions/sendLineReplyMessage';
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  // Uddb6ac82e0f9e9ced58026a85e6d0f05
  const { to, message } = await req.json()
  const response = await sendLineReply(to, message);
  return NextResponse.json({ data: response.data }, { status: 200 })
}
