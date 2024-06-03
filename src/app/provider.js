import connectDb from '@/config/database'

export default function Provider({ children }) {
  connectDb()
  return <>{children}</>
}
