
import NavBar from '@/components/NavBarComponent'
import Messages from '@/components/messages'

export default function MessagePage() {
  
  return (
    <>
      <NavBar />
      <div className="bg-white">
        <div className="container mx-auto">
          <div className='grid grid-cols-2 gap-4'>
           
            <Messages />
          
            <div>
              <h1> Sub componetn </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
