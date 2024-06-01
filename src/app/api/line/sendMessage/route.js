import axios from 'axios'

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message/push'
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN // Use environment variable for security

export async function POST(req, res) {
  const { to, message } = await req.json()
  console.log(to, message);
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
    /*
sample response data 
{
  sentMessages: [
    {
      id: '510693931936121116',
      quoteToken: 'DYA90eW8V221zBumMsuo97f6_rFvBGEt5N4KR1k-iZ7Wh5As_xCDVuypyQoGpBaS7haTrLtFxSaLA9fbhPTw3GyT59-H4Sgw2FcZbLGNaBS6WbGG7T87QmmFWIL4VbvNvLxABIAQfSNeuG-4E68f-Q'
    }
  ]
}
    */
    console.log(response.data);
    return Response.json({ status: 200, data: response.data })
  } catch (error) {
    console.log("error: ", error);
    return Response.json({ status: 500, error: error.message })
  }
}
