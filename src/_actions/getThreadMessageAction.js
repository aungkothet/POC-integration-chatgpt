'use server'
import connectDb from '@/config/database'
import MessageModel from '@/models/MessageModel'

connectDb()

export async function getThreadMessage() {
  try {
    const mData = await MessageModel.aggregate([
      {
        $sort: { 'Chats.time': 1 },
      },
      {
        $group: {
          _id: '$threadid',
          messages: { $push: '$$ROOT' },
          lastMessage: { $last: '$$ROOT' },
        },
      },
    ])
    const data = JSON.parse(JSON.stringify(mData))
    console.log(JSON.stringify(mData))
    return { data }
  } catch (e) {
    console.log(e)
    return { errorMsg: e.message }
  }
}
