import React from 'react'
// import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Counter } from "./features/counter/Counter";
import Routes from './components/Routes'
import Modal from './components/Modal'
import Header from './components/Header'
import Footer from './components/Footer'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import CartButton from './components/CartButton'
import Sidebar from './components/Sidebar'

import './App.scss'

// const theme = {
//   secondaryColor: 'red',
//   fontSizeSmall: '1.2rem',
// }

class App extends React.Component {
  render() {
    // console.log(this.props.theme)
    return (
      <ThemeProvider theme={this.props.theme}>
        <div className="app">
          <Modal />
          <Router>
            <Header />
            <main className="main ot-main">
              <Messages />
              <Routes />
              <Notifications />
              <CartButton />
            </main>
            <Sidebar />
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    )
  }
}

export default connect((state) => ({ theme: state.config.theme }), null)(App)

// const App = () => {
//   return (
//     <div className="app">
//       <Modal />
//       <Router>
//         <Header />
//         <main className="main ot-main">
//           <Messages />
//           <Routes />
//           <Notifications />
//           <CartButton />
//         </main>
//         <Sidebar />
//         <Footer />
//       </Router>
//     </div>
//   )
// }

// export default App
