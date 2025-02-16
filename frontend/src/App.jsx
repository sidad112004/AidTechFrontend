import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Signin from './components/signin/Signin';
import Navbar from './components/navbar/Navbar';
import Home from './components/homepage/Home';
import Activerequest from './components/activerequest/Activerequest';
import Pastrequest from './components/pastrequest/Pastrequest';
import Contact from './components/contact/contact';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';

function AppContent() {
  const location = useLocation();

  const noNavbarRoutes = ["/signin", "/signup"];

  return (
    <>

      {noNavbarRoutes.includes(location.pathname) ? null : <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activerequest" element={<Activerequest />} />
        <Route path="/pastrequest" element={<Pastrequest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
