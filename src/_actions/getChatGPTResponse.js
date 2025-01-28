'use server'
import MessageModel from '@/models/MessageModel'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN })

const assistant_id = process.env.OPEN_AI_ASSISTANT_ID

export default async function getAutomateResponse(question, thread_id = null) {
  // const completion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: [{ type: "text", text: message }] }],
  //     model: "gpt-3.5-turbo",
  // });

  if (!thread_id) {
    const thread = await openai.beta.threads.create()
    thread_id = thread.id
  }

  const message = await openai.beta.threads.messages.create(thread_id, {
    role: 'user',
    content: question,
  })

  const Message = {
    from: 'user',
    to: 'Amy',
    threadid: thread_id,
    Chats: [
      {
        time: new Date(),
        text: question,
      },
    ],
  }
  console.log(Message)
  const newMessage = new MessageModel(Message)
  await newMessage.save()

  let run = await openai.beta.threads.runs.createAndPoll(thread_id, {
    assistant_id: assistant_id,
  })
  let responseMsg = ''

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id)
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`)
      if (message.role == 'assistant') {
        responseMsg = message.content[0].text.value + ' '
      }
    }
    console.log(JSON.stringify(messages))
  } else {
    console.log(run.status)
  }

  const ResponseMessage = {
    from: 'Amy',
    to: 'User',
    threadid: thread_id,
    Chats: [
      {
        time: new Date(),
        text: responseMsg,
      },
    ],
  }
  const responseMessage = new MessageModel(ResponseMessage)
  await responseMessage.save()

  return responseMsg
}
