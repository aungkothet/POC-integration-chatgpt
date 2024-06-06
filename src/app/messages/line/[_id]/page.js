import { getMessageDetail } from '@/_actions/getMessageDetailAction'
/*
Sample Message Detail object 
{"_id":"6661dd227dc4c4b4ace06379","from":"System","to":"Uddb6ac82e0f9e9ced58026a85e6d0f05","Chats":{"type":"message","message":{"type":"text","id":"id","quoteToken":"quoteToken","text":"Hello This is from System","_id":"6661dd227dc4c4b4ace0637b"},"webhookEventId":"","deliveryContext":{"isRedelivery":false,"_id":"6661dd227dc4c4b4ace0637c"},"source":{"type":"system","userId":"Uddb6ac82e0f9e9ced58026a85e6d0f05","_id":"6661dd227dc4c4b4ace0637d"},"replyToken":"","mode":"active","_id":"6661dd227dc4c4b4ace0637a","createdAt":"2024-06-06T16:00:34.040Z","updatedAt":"2024-06-06T16:00:34.040Z"},"__v":0}

*/
export default async function MessageDetail({ params }){
    const {data,errMsg} = await getMessageDetail(params._id)
    if(errMsg){
        return <h1>{errMsg}</h1>
    }
    return (
        <>
        <h1>Message Detail for {params._id}</h1>
        <p>{data.Chats.message.text} {data.Chats.source.userId}</p>
        </>
    ) 
}