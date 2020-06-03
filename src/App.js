import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Counter } from "./features/counter/Counter";
import Routes from './components/Routes'
import Modal from './components/Modal'
import Header from './components/Header'
import Footer from './components/Footer'
import CartButton from './components/CartButton'
import Sidebar from './components/Sidebar'
import Notification from './components/Notifications'
import './App.scss'

const App = () => {
  return (
    <div className="app">
      <Modal />
      <Router>
        <Header />
        <main className="main ot-main">
          <Notification />
          <Routes />
          <CartButton />
        </main>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  )
}

export default App
