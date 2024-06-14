import { NextResponse } from 'next/server'

export async function GET(req, res) {
  const query = req.nextUrl.searchParams
  const VERIFY_TOKEN = "4lw3GW8EbVzCAdgtMOe7JxwoP"
  // const VERIFY_TOKEN = process.env.VERIFY_TOKEN
  // Parse the query params
  const mode = query.get('hub.mode');
  const token = query.get('hub.verify_token');
  const challenge = query.get('hub.challenge');

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

const origin = process.env.ORIGIN;

async function sendLineReply(to, message) {
  try {
    const response = await axios({
      method: "POST",
      data: { to, message },
      url: origin + "/api/line/sendMessage",
    })
    console.log('Line Reply Message Send')
  } catch (e) {
    console.log(e);
  }
}


export async function POST(req, res) {
  const body = await req.json()
  console.log("Facebook Event Received")
  console.log(body);
 
  await sendLineReply('Uddb6ac82e0f9e9ced58026a85e6d0f05', JSON.stringify(body))

  if (body.object === "page") {
    return Response.json({ status: 200, message: 'Event Received' })
  } else {
    return NextResponse.json({ error: "event is not from a page subscription" }, { status: 404 })
  }
}
