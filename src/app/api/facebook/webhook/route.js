import { NextResponse } from 'next/server'

export async function GET(req, res) {
  const query = req.nextUrl.searchParams
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN
  // Parse the query params
  const mode = query.get('hub.mode');
  const token = query.get('hub.verify_token');
  const challenge = query.get('hub.challenge');

  console.log('FACEBOOK WEBHOOK RECEIVED');
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return NextResponse.json(parseInt(challenge), { status: 200 })
    } else {
      console.log('WEBHOOK_NOT_VERIFIED');
      return NextResponse.json({ error: "WebHook Not Verified" }, { status: 403 })
    }
  }
  return NextResponse.json({ error: "WebHook Not Verified" }, { status: 403 })
}

const fs = require('fs');

export async function POST(req, res) {
  const body = await req.json()
  console.log("Facebook Event Received")
  console.log(body);
  
  fs.appendFileSync('logs.txt', JSON.stringify(body)+' \n');
  
  if (body.object === "page") {
    return Response.json({ status: 200, message: 'Event Received' })
  } else {
    return NextResponse.json({ error: "event is not from a page subscription" }, { status: 404 })
  }
}
