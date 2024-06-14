'use server'
import axios from 'axios'
import connectDb from '@/config/database'
import FbMessageModel from '@/models/FbMessageModel'

const FB_MESSAGE_API = process.env.FB_MESSAGE_URL
const FB_PAGE_ID = process.env.FB_PAGE_ID
const FB_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN

connectDb()

export default async function sendFBReply(to, message) {
  let data = JSON.stringify({
    recipient: {
      id: to
    },
    messaging_type: "RESPONSE",
    message: {
      text: message
    }
  });

  let config = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: FB_MESSAGE_API,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${FB_ACCESS_TOKEN}`,
    },
    data: data
  };

  const response = await axios.request(config)
  
  const { recipient_id, message_id } = response.data
  const systemChatMsg = {
    object: "page",
    source:{
      type: "Page",
      id: recipient_id
    },
    entry: [
      {
        time: new Date().getTime(),
        id: FB_PAGE_ID,
        messaging: [
          {
            sender: {
              id: FB_PAGE_ID
            },
            recipient: {
              id: recipient_id
            },
            timestamp: new Date().getTime(),
            message: {
              mid: message_id,
              text: message
            }
          }
        ]
      }
    ]
  }
  const FbMessage = {
    from: FB_PAGE_ID,
    to: to,
    Chats: systemChatMsg,
  }
  const newFbMessage = new FbMessageModel(FbMessage)
  await newFbMessage.save()
  return response
}