'use client'

import getAutomateResponse from '@/_actions/getChatGPTResponse'
import { getThreadMessage } from '@/_actions/getThreadMessageAction'
import ChatItem from '@/components/ChatMessageItemComponent'
import Loading from '@/components/LoadingComponent'
import MessageComponent from '@/components/MessageComponent'
import { useEffect, useState, useRef } from 'react'

export default function MessagePage() {
  const [msgData, setMsgData] = useState()
  const [thread_id, setThreadId] = useState(null)
  const [current, setCurrent] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showConv, setShowConv] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [current]) // Scroll when messages update

  useEffect(() => {
    const getMessageData = async () => {
      const { data, errorMsg } = await getThreadMessage()
      setMsgData(data)
      console.log(data)
    }
    getMessageData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return // Prevent empty messages

    const newMessage = {
      _id: new Date().getTime(),
      threadid: thread_id,
      from: 'User',
      to: 'Amy',
      Chats: [
        {
          text: message,
          time: new Date(),
        },
      ],
    }

    setMessage('') // Clear input immediately after sending
    setCurrent((prevMessages) => [...prevMessages, newMessage])
    setLoading(true)

    try {
      const replyMessages = await getAutomateResponse(message, thread_id)

      const newReplyMessage = {
        _id: new Date().getTime(),
        threadid: thread_id,
        to: 'User',
        from: 'Amy',
        Chats: [
          {
            text: replyMessages,
            time: new Date(),
          },
        ],
      }
      setLoading(false)
      setCurrent((prevMessages) => [...prevMessages, newReplyMessage])
    } catch (error) {
      setLoading(false)
      console.error('Error getting response:', error)
    }
  }

  const handleNewConversation = () => {
    // Generate a new thread ID and reset current conversation
    setThreadId(null)
    setCurrent([])
    setShowConv(true)
    setMessage('')
  }

  return (
    <div className="grid grid-cols-3 gap-4 h-full py-3">
      <div className="flex flex-col rounded">
        <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleNewConversation}
              disabled={loading}
              className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              New Conversation
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {msgData?.map((item) => (
              <div
                className={`${thread_id === item._id ? 'bg-blue-50' : ''} ${
                  loading
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (!loading) {
                    setCurrent(item.messages)
                    setThreadId(item._id)
                    setShowConv(true)
                  }
                }}
                key={item._id}
              >
                <MessageComponent
                  text={item.lastMessage.Chats[0].text}
                  time={item.lastMessage.Chats[0].time}
                  platform="facebook"
                  userId={item._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {showConv && (
        <div className="col-span-2 flex flex-col h-[calc(100vh-2rem)] bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Chat with Amy ({thread_id})
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {current?.map((msg) => (
              <ChatItem
                key={msg._id}
                isUser={msg.from == 'Amy'}
                text={msg.Chats[0].text}
                time={msg.Chats[0].time}
                id={msg._id}
              />
            ))}
            {loading && <Loading />}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <textarea
                id="message-input"
                rows="1"
                disabled={loading}
                className={`flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder={
                  loading ? 'Please wait...' : 'Type your message...'
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !loading) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <button
                type="submit"
                disabled={loading || !message.trim()} // Disable if loading or message is empty
                className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading || !message.trim()
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>Send</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
