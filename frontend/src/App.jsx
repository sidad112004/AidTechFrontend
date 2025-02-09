import React from 'react'
import Signin from './components/signin/Signin'
import Navbar from './components/navbar/Navbar'
import Home from './components/homepage/Home'

function App() {
  return (
    <div>
         <Navbar/>
         <Home/>
       {/* <Signin/> */}
    </div>
  )
}

export default App