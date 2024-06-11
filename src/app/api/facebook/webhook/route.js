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
        return NextResponse.json({error:"WebHook Not Verified"},{ status: 403 })
    }
    }
    return NextResponse.json({error:"WebHook Not Verified"},{ status: 403 })
  }

  

// export async function POST(req, res) {
//     const events = await req.json()
  
//     for( const event of events.events){
//       if (event.type === 'message' && event.message.type === 'text') {
//         console.log('Received message event: ', event);
//         /* event data sample 
//         {
//           type: 'message',
//           message: {
//             type: 'text',
//             id: '510692610982805922',
//             quoteToken: 'P90BPmVkjn1g-q2Oq3jIa30-tBbdwKWBWxHweeK7szSzcSjcl0_lz31B_FgI2enQb2Nswp8IHKpOoCvk1iTWLHPxhUl9uRM9rLEeNytNttN9GbSTbuf00qplW429paN_INw7dEGcAIULbXbYqHbP5w',
//             text: 'Hello '
//           },
//           webhookEventId: '01HZ9C2697286JR9WDN8J8FVR5',
//           deliveryContext: { isRedelivery: false },
//           timestamp: 1717227820843,
//           source: { type: 'user', userId: 'Uddb6ac82e0f9e9ced58026a85e6d0f05' },
//           replyToken: 'a923fba552704b62b941fbc552e388f6',
//           mode: 'active'
//         }
//         */
//         console.log('Received message:', event.message.text);
//         // Do save message to db here.
//         const newChatMessageModel = new chatMessageModel(event);
//         const savedModel = await newChatMessageModel.save();
//       }
//     }
//     return Response.json({ status: 200, message: 'OK.' })
//   }
  