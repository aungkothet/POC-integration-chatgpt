'use client'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter, usePathname } from 'next/navigation'

export default function NavBar() {
  const pathname = usePathname()

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
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <Image
                src={`/logo.png`}
                alt="Logo"
                className="object-contain w-100 h-100"
                width={100}
                height={100}
              />
            </Link>
          </li>
          <li>
            <Link
              href="/messages/facebook"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group ${ pathname.startsWith('/messages/facebook') ? 'bg-gray-700' : ''}`}
              aria-current="page"
            >
              <svg width="100px" viewBox='0 0 300 300' className="flex-shrink-0 w-5 h-5 text-white" >
                <rect fill='#3b5998' width='100%' height='100%' rx='15%' />
                <path fill='white' d='M110 80c0-1 0-5 1-9 0-5 2-10 6-15 3-5 8-10 16-14 7-4
                        18-6 31-6h38v42h-28c-3 0-5 1-8 3-2 2-3 4-3 6v26h39c0 
                        5-1 10-1 15l-1 13c-1 4-1 8-2 12h-35v115h-52v-115
                        h-25v-39h25v-32z'/>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Facebook Messages</span>
            </Link>
          </li>
          <li>
            <Link
              href="/messages/line"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group ${ pathname.startsWith('/messages/line') ? 'bg-gray-700' : ''}`}
              aria-current="page"
            >
              <svg width="800px" height="800px" viewBox="0 0 377.764 377.764" className="flex-shrink-0 w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#3ACE01" d="M77.315 0h223.133c42.523 0 77.315 34.792 77.315 77.315v223.133c0 42.523-34.792 77.315-77.315 77.315H77.315C34.792 377.764 0 342.972 0 300.448V77.315C0 34.792 34.792 0 77.315 0z" />
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFF" d="M188.515 62.576c76.543 0 138.593 49.687 138.593 110.979 0 21.409-7.576 41.398-20.691 58.351-.649.965-1.497 2.031-2.566 3.209l-.081.088c-4.48 5.36-9.525 10.392-15.072 15.037-38.326 35.425-101.41 77.601-109.736 71.094-7.238-5.656 11.921-33.321-10.183-37.925-1.542-.177-3.08-.367-4.605-.583l-.029-.002v-.002c-64.921-9.223-114.222-54.634-114.222-109.267-.002-61.292 62.049-110.979 138.592-110.979z" />
                <path fill-rule="evenodd" clip-rule="evenodd" fill="#3ACE01" d="M108.103 208.954h27.952c3.976 0 7.228-3.253 7.228-7.229v-.603c0-3.976-3.252-7.228-7.228-7.228h-20.121v-45.779c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.977 3.252 7.23 7.228 7.23zm173.205-33.603v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976 0 7.229-3.252 7.229-7.228v-.603c0-3.976-3.253-7.228-7.229-7.228h-27.952c-3.976 0-7.228 3.252-7.228 7.228v53.609c0 3.976 3.252 7.229 7.228 7.229h27.952c3.976 0 7.229-3.253 7.229-7.229v-.603c0-3.976-3.253-7.228-7.229-7.228h-20.12v-11.445h20.12c3.976.002 7.229-3.251 7.229-7.226zm-53.755 31.448l.002-.003a7.207 7.207 0 0 0 2.09-5.07v-53.609c0-3.976-3.252-7.228-7.229-7.228h-.603c-3.976 0-7.228 3.252-7.228 7.228v31.469l-26.126-35.042c-1.248-2.179-3.598-3.655-6.276-3.655h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.252 7.229 7.229 7.229h.603c3.976 0 7.228-3.253 7.228-7.229v-32.058l26.314 35.941c.162.252.339.494.53.724l.001.002c.723.986 1.712 1.662 2.814 2.075.847.35 1.773.544 2.742.544h.603a7.162 7.162 0 0 0 3.377-.844c.723-.344 1.332-.788 1.761-1.311zm-71.208 2.155h.603c3.976 0 7.228-3.253 7.228-7.229v-53.609c0-3.976-3.252-7.228-7.228-7.228h-.603c-3.976 0-7.229 3.252-7.229 7.228v53.609c0 3.976 3.253 7.229 7.229 7.229z" />
              </svg>

              <span class="flex-1 ms-3 whitespace-nowrap">Line Messages</span>
            </Link>
          </li>

          <li>
            <Link
              href="/privacy-policy"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 group ${ pathname.startsWith('/privacy-policy') ? 'bg-gray-700' : ''}`}
              aria-current="page"
            >
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 text-white">
                <path d="M17 12C17 12.6566 16.8707 13.3068 16.6194 13.9134C16.3681 14.52 15.9998 15.0712 15.5355 15.5355C15.0712 15.9998 14.52 16.3681 13.9134 16.6194C13.3068 16.8707 12.6566 17 12 17C11.3434 17 10.6932 16.8707 10.0866 16.6194C9.47995 16.3681 8.92876 15.9998 8.46447 15.5355C8.00017 15.0712 7.63188 14.52 7.3806 13.9134C7.12933 13.3068 7 12.6566 7 12C7 11.3434 7.12933 10.6932 7.3806 10.0866C7.63188 9.47995 8.00017 8.92876 8.46447 8.46447C8.92876 8.00017 9.47996 7.63188 10.0866 7.3806C10.6932 7.12933 11.3434 7 12 7C12.6566 7 13.3068 7.12933 13.9134 7.3806C14.52 7.63188 15.0712 8.00017 15.5355 8.46447C15.9998 8.92876 16.3681 9.47996 16.6194 10.0866C16.8707 10.6932 17 11.3434 17 12L17 12Z" stroke="#fff" stroke-width="1.5" />
                <path d="M13.8478 13.9134C13.9483 13.3068 14 12.6566 14 12C14 11.3434 13.9483 10.6932 13.8478 10.0866C13.7472 9.47996 13.5999 8.92876 13.4142 8.46447C13.2285 8.00017 13.008 7.63188 12.7654 7.3806C12.5227 7.12933 12.2626 7 12 7C11.7374 7 11.4773 7.12933 11.2346 7.3806C10.992 7.63188 10.7715 8.00017 10.5858 8.46447C10.4001 8.92876 10.2528 9.47995 10.1522 10.0866C10.0517 10.6932 10 11.3434 10 12C10 12.6566 10.0517 13.3068 10.1522 13.9134C10.2527 14.52 10.4001 15.0712 10.5858 15.5355C10.7715 15.9998 10.992 16.3681 11.2346 16.6194C11.4773 16.8707 11.7374 17 12 17C12.2626 17 12.5227 16.8707 12.7654 16.6194C13.008 16.3681 13.2285 15.9998 13.4142 15.5355C13.5999 15.0712 13.7472 14.52 13.8478 13.9134Z" stroke="#fff" stroke-width="1.5" />
                <path d="M7 12H17" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 14.4963 20.1632 16.4284 19 17.9041M3.19284 14C4.05026 18.2984 7.57641 20.5129 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C14.6796 21.2747 15.3324 20.9478 16 20.5328" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Privacy Policy</span>
            </Link>
          </li>
          <li>
            <a class="flex items-center p-2 text-gray-900 cursor-pointer rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={logout}>
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap">Log Out</span>
            </a>
          </li>

        </ul>
      </div>
    </aside>
  )
}
