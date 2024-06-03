import connectDb from '@/config/database'
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'

connectDb()

export async function POST(request, response) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    const user = await User.findOne({ email })
    if (user) {
      return Response.json({ error: 'User already exists' }, { status: 400 })
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

    return Response.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
