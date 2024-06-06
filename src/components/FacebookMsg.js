'use client'
import { FacebookProvider, CustomChat } from 'react-facebook'

export default function FacebookMessenger() {
  return (
    <FacebookProvider appId="416029255554876" chatSupport>
      <CustomChat pageId="103277147693547"  />
    </FacebookProvider>
  )
}
