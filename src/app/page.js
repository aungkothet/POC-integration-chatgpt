'use client'
import LineScanImage from '@/components/LineScanImageComponent'
import NavBar from '@/components/NavBarComponent'
import { useState } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [lineMessage, setLineMessage] = useState({
    to: '',
    message: '',
  })

  const sendMessage = async () => {
    setLoading(true)
    const res = await fetch('/api/line/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lineMessage),
    })
    if (res.ok) {
      alert('Message sent!')
    } else {
      alert('Failed to send message')
    }
    setLoading(false)
  }

  return (
    <>
      <NavBar />
      <section className="bg-gray-50 dark:bg-gray-900 h-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Send Line Message to User
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="to"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    User ID
                  </label>
                  <input
                    type="text"
                    name="to"
                    id="to"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={lineMessage.to}
                    onChange={(e) =>
                      setLineMessage({ ...lineMessage, to: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    name="message"
                    id="message"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={lineMessage.message}
                    onChange={(e) =>
                      setLineMessage({ ...lineMessage, message: e.target.value })
                    }
                  />
                </div>
                <button
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  // onClick={sendMessage}
                >
                  {loading ? 'loading...' : 'Send'}
                </button>
              </div>
            </div>
            <LineScanImage/>
          </div>
        </div>
      </section>
    </>
  )
}
