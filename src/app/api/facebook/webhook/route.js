import getAutomateResponse from '@/_actions/getChatGPTResponse';
import sendFBReply from '@/_actions/sendFBReplyMessage';
import FbMessageModel from '@/models/FbMessageModel';
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
  /*
{"object":"page","entry":[{"time":1718380009258,"id":"320206154518049","messaging":[{"sender":{"id":"25627837360195012"},"recipient":{"id":"320206154518049"},"timestamp":1718380008377,"message":{"mid":"m_EDZ36cdHBPRbGwJDML5gzprgVw3YhXI7KkzkAzpY0ItydcdjK4bzP48z7e0hu6q_3hBUcJT9TgPAZQZ23eZ2hw","text":"Hello"}}]}]} 
  */
  fs.appendFileSync('logs.txt', JSON.stringify(body) + ' \n');

  if (body.object === "page") {

    const messageOuter = body.entry[0].messaging[0];

    body.source = {
      type: "User",
      id: messageOuter.sender.id
    }
    if(messageOuter.message != null){
      // normal message
      const newFbMessage = new FbMessageModel({
        from: messageOuter.sender.id,
        to: messageOuter.recipient.id,
        Chats: body
      });
      const savedModel = await newFbMessage.save();
      // // send request to ChatGPT
      const gptChoicesAry = await getAutomateResponse(messageOuter.message.text)
      // // console.log("FB webhook: ", gptChoicesAry);
  
      let replyMessages = "";
      gptChoicesAry.forEach((choice) => {
        replyMessages += choice.message.content;
      });
    }else {
      // postback message
      let replyMessages = "Hello, Welcome."
    }
    
    // // console.log(replyMessages);
    // // // send response back to user
    const sendLineReplyResponse = await sendFBReply(messageOuter.sender.id, replyMessages);

    return Response.json({ status: 200, message: 'Event Received' })
  } else {
    return NextResponse.json({ error: "event is not from a page subscription" }, { status: 404 })
  }
}
