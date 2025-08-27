import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <main className=' min-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}

export default layout