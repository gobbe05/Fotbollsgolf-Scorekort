import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../styles/reset.css'
import Signup from './components/Signup'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import Round from './pages/Round'
import Home from './pages/Home'
import Header from './components/Header'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/round/:roundId" element={<Round />}></Route>
    </Routes>
      
    </BrowserRouter>
      
      
    </>
)
