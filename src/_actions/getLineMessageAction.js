
'use server'
import LineMessageModel from '@/models/LineMessageModel'

export async function getLineMessages() {
  try {
    const mData = await LineMessageModel.aggregate([
      {
        $sort: { timestamp: 1 }, // Sort documents by timestamp in ascending order
      },
      {
        $group: {
          _id: '$Chats.source.userId',
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
