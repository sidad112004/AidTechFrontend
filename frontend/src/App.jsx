import React from 'react'
import Signin from './components/signin/Signin'
import Navbar from './components/navbar/Navbar'
import Home from './components/homepage/Home'
import Activerequest from './components/activerequest/Activerequest'

function App() {
  return (
    <div>
         <Navbar/>
         {/* <Home/> */}
         <Activerequest/>
       {/* <Signin/> */}
    </div>
  )
}

export default App