'use server'
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN })
export default async function getChatGPTAssistantList() {
  const myAssistants = await openai.beta.assistants.list({
    order: 'desc',
    limit: '20',
  })
  // console.log('inside promise myAssistants: ', myAssistants.data)
  return myAssistants.data
}
