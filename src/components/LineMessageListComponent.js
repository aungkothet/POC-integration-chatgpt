import Link from 'next/link'
import LineMessageItem from './LineMessageItemComponent'

export default function LineMessageList({ data }) {
  return (
    <ul className="max-w">
      {data.map((msg) => (
        <Link href={'/messages/line/' + msg._id} key={msg._id}>
          <LineMessageItem msg={msg} />
        </Link>
      ))}
    </ul>
  )
}
