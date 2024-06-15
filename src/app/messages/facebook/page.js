'use client'
import { getFacebookMessages } from '@/_actions/getFacebookMessageAction'
import FBMessageList from '@/components/FBMessageListComponent'
import MessageComponent from '@/components/MessageComponent'
import { useEffect, useState } from 'react'

export default function MessagePage() {
  const [msgData, setMsgData] = useState()
  const [errorMsg, setErrMsg] = useState()

  useEffect(() => {
    const getMessageData = async () => {
      const { data, errorMsg } = await getFacebookMessages()
      setMsgData(data)
      setErrMsg(errorMsg)
    }
    getMessageData()
  }, [])
  const [current, setCurrent] = useState()

  if (errorMsg) {
    return <h1>{errorMsg}</h1>
  }

  return (
    <div className="grid grid-cols-3 gap-4 h-full py-3 ">
      <div className="flex flex-col rounded">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="divide-y divide-gray-200">
            {msgData?.map((item) => (
              <div
                className={`${current?._id == item._id ? 'bg-neutral-600 last:rounded-b first:rounded-t' : ''}`}
                onClick={() => setCurrent(item)}
                key={item._id}>
                <MessageComponent
                  text={item.lastMessage.Chats.entry[0].messaging[0].message.text}
                  time={item.lastMessage.Chats.createdAt}
                  platform="facebook"
                  userId={item._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {current && (
        <div className="flex items-center col-span-2 justify-center rounded shadow-md bg-white bg-clip-border mb-3">
          <FBMessageList data={current.messages} />
        </div>
      )}
    </div>
  )
}
