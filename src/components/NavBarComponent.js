'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const router = useRouter()
  const logout = () => {
    axios
      .get('/api/users/logout')
      .then(function (response) {
        // handle success
        router.push('/login')
      })
      .catch(function (error) {
        // handle error
        console.log(error.message)
      })
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-primary-900 fixed w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={`/logo.png`}
            alt="Logo"
            className="object-contain"
            width={100}
            height={100}
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link
                href="/messages/line"
                className="block py-2 px-3 text-main rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Line Messages
              </Link>
            </li>
            <li className="cursor-pointer">
              <span
                className="block py-2 px-3 text-main rounded md:bg-transparent md:p-0"
                onClick={logout}
                aria-current="page"
              >
                Log Out
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
