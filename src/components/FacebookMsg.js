'use client'
import { FacebookProvider, CustomChat, MessageUs } from 'react-facebook'

export default function FacebookMessenger() {
  return (
    <FacebookProvider appId="463019672993775" chatSupport>
      <CustomChat pageId="320206154518049"  />
      {/* <MessageUs messengerAppId="2265852817095450" pageId="123456789"/> */}
    </FacebookProvider>
  )
}
