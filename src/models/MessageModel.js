import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema({
  time: String,
  text: String,
})

const ChatSchema = new Schema({
  from: String,
  to: String,
  threadid: String,
  Chats: [MessageSchema],
})

const MessageModel = models?.chat_threads || model('chat_threads', ChatSchema)

export default MessageModel
