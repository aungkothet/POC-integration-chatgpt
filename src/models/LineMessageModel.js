import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema({
  type: String,
  id: String,
  quoteToken: String,
  text: String,
})

const SourceSchema = new Schema({
  type: String,
  userId: String,
})
const ReDeliverySchema = new Schema({
  isRedelivery: Boolean,
})

const LineMessageSchema = new Schema(
  {
    type: String,
    message: MessageSchema,
    webhookEventId: String,
    deliveryContext: ReDeliverySchema,
    source: SourceSchema,
    replyToken: String,
    mode: String,
  },
  { timestamps: true }
)

const ChatSchema = new Schema({
  from: String,
  to: String,
  Chats: LineMessageSchema,
})

const LineMessageModel =
  models?.LineMessage || model('LineMessage', ChatSchema)

export default LineMessageModel
