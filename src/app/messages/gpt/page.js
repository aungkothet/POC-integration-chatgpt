'use client'

import getAutomateResponse from '@/_actions/getChatGPTResponse'
import ChatItem from '@/components/ChatMessageItemComponent'
import Loading from '@/components/LoadingComponent'
import { useState } from 'react'

export default function MessagePage() {
  const [msgData, setMsgData] = useState()

  const [current, setCurrent] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMessage = {
      _id: new Date().getTime(),
      isUser: true,
      text: message,
    }
    setCurrent((prevMessages) => [...prevMessages, newMessage])
    setLoading(true)
    const replyMessages = await getAutomateResponse(message)

    const newReplyMessage = {
      _id: new Date().getTime(),
      isUser: false,
      text: replyMessages,
    }
    setLoading(false)
    setCurrent((prevMessages) => [...prevMessages, newReplyMessage])
    setMessage('')
  }

  return (
    <div className="grid grid-cols-3 gap-4 h-full py-3 ">
      <div className="flex flex-col rounded">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="divide-y divide-gray-200">
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Send A Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Message
                      </label>
                      <textarea
                        id="description"
                        rows="8"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                  >
                    Send
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      {current && (
        <div className="flex items-center col-span-2 justify-center rounded shadow-md bg-white bg-clip-border mb-3">
          <div className="h-screen overflow-y-auto p-4 w-full">
            {current.map((msg) => (
              <ChatItem
                key={msg._id}
                isUser={msg.isUser}
                text={msg.text}
                time="2025-01-20T18:14:32.630+00:00"
                id={msg._id}
              />
            ))}
            {loading && <Loading />}
          </div>
        </div>
      )}
    </div>
  )
}
