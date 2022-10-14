import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../styles/reset.css'
import Home from './pages/Home'
import Round from './pages/Round'
import Header from '../components/header'
import Footer from '../components/footer'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="round" element={<Round />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
