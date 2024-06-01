import { getMessages } from '@/_actions/getChatMessageAction'

export default async function Messages(){
    const {data, errorMsg} = await getMessages()
    console.log(data)
    if(errorMsg){
        return <h1>{errorMsg}</h1>;
    }

    return <main>
        <h1>FUCK U</h1>
        {data.map(msg=> (
            <p>{msg.message.text}</p>
        ))
        }
    </main>
}