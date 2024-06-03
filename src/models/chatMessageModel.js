import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema({
  type: String,
  id: String,
  quoteToken: String,
  text: String,
})

const ReDeliverySchema = new Schema({
  isRedelivery: Boolean,
})

const SourceSchema = new Schema({
  type: String,
  userId: String,
})

const chatMessageSchema = new Schema(
  {
    type: String,
    message: {
      type: MessageSchema,
      required: true,
    },
    webhookEventId: String,
    deliveryContext: ReDeliverySchema,
    source: SourceSchema,
    replyToken: String,
    mode: String,
  },
  { timestamps: true }
)

const chatMessageModel =
  models.chatmessages || model('chatmessages', chatMessageSchema)

export default chatMessageModel
