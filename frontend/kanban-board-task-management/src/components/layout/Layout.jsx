import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

function Layout() {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <main>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
