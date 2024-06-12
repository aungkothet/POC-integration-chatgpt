import NavBar from '@/components/NavBarComponent'

export default function MessagePageLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto bg-white h-100 mt-16 py-9">{children}</div>
    </>
  )
}
