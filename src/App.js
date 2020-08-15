import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import TagManager from 'react-gtm-module'
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
import ErrorFatalPage from './components/ErrorFatalPage'
import ErrorBoundary from './components/ErrorBoundary'
import { fetchConfig } from './slices/configSlice'
import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { gtmId: false }
  }

  componentDidMount() {
    this.props.fetchConfig()
  }

  componentDidUpdate() {
    const { loading, brand } = this.props
    if (loading !== 'pending' && brand && !this.state.gtmId) {
      this.setState({ gtmId: true })
      const tagManagerArgs = { gtmId: brand.gtmContainerId }
      TagManager.initialize(tagManagerArgs)
    }
  }

  render() {
    const { loading, theme, brand, error } = this.props
    const { body, headings } = theme ? theme.fonts : {}
    return loading === 'pending' || (!theme && !error) ? (
      <Loader className="loading--page" type="Clip" size={32} />
    ) : error ? (
      <ErrorFatalPage error={error} />
    ) : (
      <ThemeProvider theme={this.props.theme}>
        <GlobalStyles />
        <ErrorBoundary>
          <div className="app">
            <Helmet>
              <title>{brand.title}</title>
              <meta name="description" content={brand.description} />
              <link rel="icon" href={brand.favicon} />
              <link rel="apple-touch-icon" href={brand.appleTouchIcon} />
              <link href={body.url} rel="stylesheet" />
              {headings.url && body.url !== headings.url && (
                <link href={headings.url} rel="stylesheet" />
              )}
            </Helmet>
            <Router>
              <Modal />
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
    brand: state.config.brand,
    loading: state.config.loading,
    error: state.config.error,
  }),
  { fetchConfig }
)(App)
