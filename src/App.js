import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Counter } from "./features/counter/Counter";
import Routes from './components/Routes'
import Modal from './components/Modal'
import Header from './components/Header'
import Footer from './components/Footer'
import CartButton from './components/CartButton'
import './App.scss'

const App = () => {
  return (
    <div className="app">
      <Modal />
      <Router>
        <Header />
        {/* <SystemNotifications /> */}
        <main className="main container">
          <Routes />
        </main>
        {/* <Drawer /> */}
        {/* <SideCurtain /> */}
        <Footer />
      </Router>
      <CartButton />
    </div>
  )
}

export default App
