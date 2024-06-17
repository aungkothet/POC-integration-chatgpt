'use server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_ACCESS_TOKEN })

export default async function updateInstruction(assistantId, instruction, top, temp) {
  const myUpdatedAssistant = await openai.beta.assistants.update(assistantId, {
    instructions: instruction,
    temperature: parseFloat(temp),
    top_p: parseFloat(top)
  })

  // console.log('inside promise myUpdatedAssistant: ', myUpdatedAssistant)
  /*
  inside promise myUpdatedAssistant:  {
  id: 'asst_2mmxmMzDoh5t1RXJ5B4Mp61z',
  object: 'assistant',
  created_at: 1718621209,
  name: 'POC-Assistant',
  description: null,
  model: 'gpt-3.5-turbo',
  instructions: 'This is updated instruction',
  tools: [],
  top_p: 1,
  temperature: 1,
  tool_resources: {},
  metadata: {},
  response_format: 'auto'
}
*/
  return {data:myUpdatedAssistant, message:'Success'}
}
