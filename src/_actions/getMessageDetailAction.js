import chatMessageModel from '@/models/chatMessageModel'

export async function getMessageDetail(id) {
  const data = JSON.parse(JSON.stringify(await chatMessageModel.findById(id)))
  if (data) {
    return { data }
  } else {
    return { errorMsg: 'Not Found' }
  }
}
