import ChatItem from "./ChatMessageItemComponent"

export default function FBMessageList({ data }) {
  const FB_PAGE_ID = process.env.FB_PAGE_ID
  return (
    <div className="h-screen overflow-y-auto p-4 w-full">
      {data.map((msg) => (
        <ChatItem
          key={msg._id}
          isUser={(msg.Chats.entry[0].messaging[0].sender.id != FB_PAGE_ID)}
          text={msg.Chats.entry[0].messaging[0].message.text}
          time={msg.Chats.createdAt} 
          id={msg._id}/>
      ))}
    </div>
  )
}


