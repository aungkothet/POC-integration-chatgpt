import NavBar from '@/components/NavBarComponent'

export default function MessagePageLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="bg-white">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  )
}
