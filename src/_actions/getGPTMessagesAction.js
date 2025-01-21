'use server'
import connectDb from '@/config/database'
import FbMessageModel from '@/models/FbMessageModel'

connectDb()

export async function getGPTMessages() {
  try {
    const mData = await FbMessageModel.aggregate([
      {
        $sort: { timestamp: 1 }, // Sort documents by timestamp in ascending order
      },
      {
        $group: {
          _id: '$Chats.source.id',
          messages: { $push: '$$ROOT' },
          lastMessage: { $last: '$$ROOT' }, // Get the last document in the sorted order
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
