import LineMessageModel from '@/models/LineMessageModel'
import axios from 'axios'
import { NextResponse } from 'next/server'

const LINE_MESSAGING_API = process.env.LINE_MESSAGING_API
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN

const sendLineMessage = async (to, message) => {
  try {
    const response = await axios.post(
      LINE_MESSAGING_API,
      {
        to,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
      }
    )
    const { id, quoteToken } = response.data.sentMessages
    const systemChatMsg = {
      type: 'message',
      message: {
        type: 'text',
        id: id,
        quoteToken: quoteToken,
        text: message,
      },
      webhookEventId: '',
      deliveryContext: { isRedelivery: false },
      timestamp: new Date().getTime(),
      source: { type: 'system', userId: to },
      replyToken: '',
      mode: 'active',
    }
    const LineMessage = {
      from: 'System',
      to: to,
      Chats: systemChatMsg,
    }
    return LineMessage;
  } catch (error) {
    console.log('error: ', error)
    return "";
  }
}
export async function POST(req, res) {
  // Uddb6ac82e0f9e9ced58026a85e6d0f05
  const { to, message } = await req.json()
  const LineMessage = await sendLineMessage(to, message);
  if (LineMessage != "") {
    const newLineMessage = new LineMessageModel(LineMessage)
    await newLineMessage.save()
  }
  return NextResponse.json({ data: response.data }, { status: 200 })
}
