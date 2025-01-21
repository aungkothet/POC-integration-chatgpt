export default function ChatItem({ text, time, isUser, _id }) {
  if (isUser) {
    return (
      <div className="flex mb-4 cursor-pointer" key={_id}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
          <img
            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex max-w-96 bg-primary-500 text-white rounded-lg p-3 gap-3">
          <p>{text}</p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-end justify-center ml-4 text-neutral-600 text-sm">
          <span>{new Date(time).toLocaleTimeString()}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-end mb-4 cursor-pointer" key={_id}>
        <div className="w-9 h-9 rounded-full flex items-end justify-center mr-4 text-neutral-600 text-sm">
          <span>{new Date(time).toLocaleTimeString()}</span>
        </div>
        <div className="flex max-w-96 bg-primary-500 text-white rounded-lg p-3 gap-3">
          <p>{text}</p>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="My Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    )
  }
}
