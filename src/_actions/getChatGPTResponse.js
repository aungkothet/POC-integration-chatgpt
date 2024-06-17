'use server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN })

const assistant_id = process.env.OPEN_AI_ASSISTANT_ID

export default async function getAutomateResponse(question) {
  // const completion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: [{ type: "text", text: message }] }],
  //     model: "gpt-3.5-turbo",
  // });

  const thread = await openai.beta.threads.create()

  const message = await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: question,
  })

  let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant_id,
  })
  let responseMsg = ''

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id)
    for (const message of messages.data.reverse()) {
      console.log(`${message.role} > ${message.content[0].text.value}`)
      if (message.role == 'assistant') {
        responseMsg += message.content[0].text.value + ' '
      }
    }
    console.log(JSON.stringify(messages))
  } else {
    console.log(run.status)
  }
  return responseMsg
}
