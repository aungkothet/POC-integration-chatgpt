import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
})

const User = models.users || model('users', userSchema)

export default User
