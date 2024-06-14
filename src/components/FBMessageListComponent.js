import Link from 'next/link'
import FBMessageItem from './FBMessageItemComponent'

export default function FBMessageList({ data }) {
  return (
    <ul className="max-w">
      {data.map((msg) => (
        // <Link href={'/messages/facebook/' + msg._id} key={msg._id}>
          <FBMessageItem msg={msg} key={msg._id}/>
        // </Link>
      ))}
    </ul>
  )
}
