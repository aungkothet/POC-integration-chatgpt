import { getMessageDetail } from '@/_actions/getMessageDetailAction'

export default async function MessageDetail({ params }){
    const {data,errMsg} = await getMessageDetail(params._id)
    if(errMsg){
        return <h1>{errMsg}</h1>
    }
    return (
        <>
        <h1>Message Detail for {params._id}</h1>
        <p>{data.message.text} {data.source.userId}</p>
        </>
    ) 
}