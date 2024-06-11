import LineMessageModel from '@/models/LineMessageModel'

export async function getMessageDetail(id) {
  const mData = JSON.stringify(await LineMessageModel.findById(id));
  const data = JSON.parse(mData)
  if (data) {
    return { data }
  } else {
    return { errorMsg: 'Not Found' }
  }
}
