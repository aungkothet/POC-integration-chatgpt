export default function LineMessageItem({ msg }) {
  return (
    <div
      className="p-3 my-1 rounded border border-secondary-200 cursor-pointer hover:border-primary-800"
      key={msg._id}
    >
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div
          className={`flex-1 min-w-0 ${
            msg.from.toLowerCase() == 'system' ? 'text-end' : ''
          }`}
        >
          <p className="text-sm font-medium truncate mb-2">
            {msg.from.toLowerCase() == 'system'
              ? 'System Response'
              : `User (${msg.Chats.source.userId})`}
          </p>
          <p className="text-sm truncate">{msg.Chats.message.text}</p>
        </div>
      </div>
    </div>
  )
}
