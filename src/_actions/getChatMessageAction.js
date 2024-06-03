import chatMessageModel from '@/models/chatMessageModel'

export async function getMessages() {
  try {
    const data = JSON.parse(JSON.stringify(await chatMessageModel.find()))
    return { data }
  } catch (e) {
    console.log(e)
    return { errorMsg: e.message }
  }
}
