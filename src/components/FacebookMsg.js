'use client'
import { FacebookProvider, MessageUs } from 'react-facebook'

export default function FacebookMessenger() {
  return (
    <div className="px-6 pb-3 space-y-4">
      <FacebookProvider appId="463019672993775">
        <MessageUs messengerAppId="463019672993775" pageId="320206154518049" />
      </FacebookProvider>
    </div>
  )
}
