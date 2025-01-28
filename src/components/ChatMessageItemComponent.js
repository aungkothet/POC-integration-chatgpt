export default function ChatItem({ text, time, isUser, _id }) {
  // Helper function to detect and convert URLs to links
  const renderTextWithLinks = (text) => {
    // Basic URL regex pattern
    const urlPattern = /https?:\/\/[^\s]+/g

    if (!text.match(urlPattern)) {
      return text
    }

    return text.split(urlPattern).map((part, index, array) => {
      if (index < array.length - 1) {
        const url = text.match(urlPattern)[index]
        return (
          <>
            {part}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {url}
            </a>
          </>
        )
      }
      return part
    })
  }

  if (isUser) {
    return (
      <div className="flex mb-4" key={_id}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex flex-col max-w-[75%]">
          <div className="flex max-w-fit bg-blue-600 text-white rounded-2xl px-4 py-2">
            <p className="text-sm whitespace-pre-wrap break-all">
              {renderTextWithLinks(text)}
            </p>
          </div>
          <span className="text-xs text-gray-500 mt-1 ml-2">
            {new Date(time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-end mb-4" key={_id}>
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="flex max-w-fit bg-gray-100 text-gray-800 rounded-2xl px-4 py-2">
            <p className="text-sm whitespace-pre-wrap break-all">
              {renderTextWithLinks(text)}
            </p>
          </div>
          <span className="text-xs text-gray-500 mt-1 mr-2">
            {new Date(time).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="Assistant Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    )
  }
}
