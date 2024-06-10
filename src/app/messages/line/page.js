'use client'
import { getLineMessages } from '@/_actions/getLineMessageAction'
import LineMessageItem from '@/components/LineMessageItemComponent'
import LineMessageList from '@/components/LineMessageListComponent'
import { useEffect, useState } from 'react'

export default function MessagePage() {
  const [msgData, setMsgData] = useState()
  const [errorMsg, setErrMsg] = useState()

  useEffect(() => {
    const getMessageData = async () => {
      const { data, errorMsg } = await getLineMessages()
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
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-white p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Click Conversation for detail
            </h2>
            <ul>
              {msgData?.map((item) => (
                <li
                  className={`mb-2 rounded ${
                    current?._id == item._id ? 'bg-primary-900 text-white' : ''
                  }`}
                  onClick={() => setCurrent(item)}
                  key={item._id}
                >
                  <LineMessageItem msg={item.lastMessage} /> {(current?._id == item._id) }
                </li>
              ))}
            </ul>
          </div>
          {current && (
            <div className="bg-white p-6 max-h-96 h-full border rounded mt-5 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Full Conversation Between System and User</h2>
              <LineMessageList data={current.messages} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
