import ChatItem from "./ChatMessageItemComponent";

export default function LineMessageList({ data }) {
  return (
    <div className="h-screen overflow-y-auto p-4 w-full">
      {data.map((msg) => (
        <ChatItem
          key={msg._id}
          isUser={(msg.from.toLowerCase() != 'system')}
          text={msg.Chats.message.text}
          time={msg.Chats.createdAt}
          id={msg._id}
        />
      ))}
    </div>
  )
}
