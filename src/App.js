import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'emotion-theming'
import GlobalStyles from './GlobalStyles'
import Routes from './components/Routes'
import Modal from './components/Modal'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import CartButton from './components/CartButton'
import Sidebar from './components/Sidebar'
import Loader from './components/Loader'
import { fetchConfig } from './slices/configSlice'
import './App.scss'
import ErrorBoundary from './components/ErrorBoundary'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchConfig()
  }

  render() {
    const { loading, theme } = this.props
    return loading === 'pending' || !theme ? (
      <Loader className="loading--page" type="Clip" size={32} />
    ) : (
      <ThemeProvider theme={this.props.theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <div className="app">
            <Modal />
            <Router>
              <Main>
                <Header />
                <Messages />
                <Routes />
                <Notifications />
                <CartButton />
                <Footer />
              </Main>
              <Sidebar />
            </Router>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    )
  }
}

export default connect(
  (state) => ({
    theme: state.config.theme,
    loading: state.config.loading,
  }),
  { fetchConfig }
)(App)
