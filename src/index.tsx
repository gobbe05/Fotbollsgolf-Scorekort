import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/reset.css'
import Landingpage from './landingpage'
import Header from '../components/header'
import Footer from '../components/footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Landingpage />
    <Footer />
  </React.StrictMode>
)
