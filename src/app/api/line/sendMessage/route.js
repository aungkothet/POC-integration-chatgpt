import chatMessageModel from '@/models/chatMessageModel'
import axios from 'axios'

const LINE_MESSAGING_API = process.env.LINE_MESSAGING_API
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN

export async function POST(req, res) {
  // Uddb6ac82e0f9e9ced58026a85e6d0f05
  const { to, message } = await req.json()
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
      source: { type: 'system', userId: 'System' },
      replyToken: '',
      mode: 'active',
    }

    const newChatMessageModel = new chatMessageModel(systemChatMsg)
    await newChatMessageModel.save()
    return Response.status(200).json({ status: 200, data: response.data })
  } catch (error) {
    console.log('error: ', error)
    return Response.status(500).json({ status: 500, error: error.message })
  }
}
