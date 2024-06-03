import { getMessages } from '@/_actions/getChatMessageAction'

export default async function Messages() {
  const { data, errorMsg } = await getMessages()
  if (errorMsg) {
    return <h1>{errorMsg}</h1>
  }
  return (
    <div className="max-h-screen overflow-scroll">
      <ul className="max-w">
        {data.map((msg) => (
          <li
            className="p-3 my-1 rounded border border-secondary-200 cursor-pointer hover:border-primary-800"
            key={msg._id}
          >
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div
                className={`flex-1 min-w-0 ${
                  msg.source.type == 'system' ? 'text-end' : ''
                }`}
              >
                <p className="text-sm font-medium truncate mb-2">
                  {msg.source.type == 'user'
                    ? `User (${msg.source.userId})`
                    : 'System Response'}
                </p>
                <p className="text-sm truncate">{msg.message.text}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
