import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema(
  {
    time: {
      type: Date,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
) // Disable auto _id for subdocuments

const ChatSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  threadid: {
    type: String,
    required: true,
  },
  Chats: {
    type: [MessageSchema],
    required: true,
  },
})

const MessageModel = models?.chat_threads || model('chat_threads', ChatSchema)

export default MessageModel
