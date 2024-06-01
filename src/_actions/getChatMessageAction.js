import chatMessageModel from '@/models/chatMessageModel'
import connectDb from '@/config/database'
// import PostModel from '@/models/postModel'

export async function getMessages() {
  try {
    await connectDb()
    const data = JSON.parse(JSON.stringify(await chatMessageModel.find()))
    return { data }
  } catch (e) {
    console.log(e)
    return { errorMsg: e.message }
  }
}
