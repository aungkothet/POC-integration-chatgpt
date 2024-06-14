export default function FBMessageItem({ msg }) {
  const FB_PAGE_ID = process.env.FB_PAGE_ID

  return (
    <div
      className="p-3 my-1 rounded border border-secondary-200 overflow-y-auto cursor-pointer hover:border-primary-800"
      key={msg._id}
    >
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div
          className={`flex-1 min-w-0 ${msg.from ==  FB_PAGE_ID ? 'text-end' : ''
            }`}
        >
          <p className="text-sm font-medium truncate mb-2">
            {msg.from == FB_PAGE_ID
              ? 'Page Response'
              : `User (${msg.Chats.source.id})`}
          </p>
          <p className="text-sm truncate">{msg.Chats.entry[0].messaging[0].message.text}</p>
          <p className="text-xs truncate mt-2">{new Date(msg.Chats.createdAt).toString()}</p>
        </div>
      </div>
    </div>
  )
}