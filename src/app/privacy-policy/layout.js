import NavBar from '@/components/NavBarComponent'

export default function MessagePageLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="p-4 sm:ml-64  h-screen">
        {children}
      </div>
    </>
  )
}
