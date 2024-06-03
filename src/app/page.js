'use client'
import NavBar from '@/components/NavBarComponent'
import { useState } from 'react'

export default  function Home() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    const res = await fetch('/api/line/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, message }),
    })

    if (res.ok) {
      alert('Message sent!')
    } else {
      alert('Failed to send message')
    }
  }

  return (
    <>
    <NavBar/>
    <div>
      <h1>Send Message to LINE</h1>
      <input
        type="text"
        placeholder="User ID"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    </>
    
  )
}
