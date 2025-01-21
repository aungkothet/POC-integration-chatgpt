import { Schema, model, models } from 'mongoose'

const UserIdSchema = new Schema({
  id: String,
})

const InnerMessageSchema = new Schema({
  mid: String,
  text: String,
})

const SourceSchema = new Schema({
  type: String,
  id: String,
})

const OuterMessageSchema = new Schema({
  sender: UserIdSchema,
  recipient: UserIdSchema,
  timestamp: String,
  message: InnerMessageSchema,
})

const MessageSchema = new Schema({
  time: String,
  id: String,
  messaging: [OuterMessageSchema],
})

const FbMessageSchema = new Schema(
  {
    object: String,
    entry: [MessageSchema],
    source: SourceSchema,
  },
  {
    timestamps: true,
  }
)

const ChatSchema = new Schema({
  from: String,
  to: String,
  Chats: FbMessageSchema,
})

const MessageModel = models?.Messages || model('Messages', ChatSchema)

export default MessageModel
