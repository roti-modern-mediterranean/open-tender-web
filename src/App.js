import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import TagManager from 'react-gtm-module'
import GlobalStyles from './GlobalStyles'
import Routes from './components/Routes'
import Modal from './components/Modal'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import CartButton from './components/CartButton'
import Sidebar from './components/Sidebar'
import ErrorFatalPage from './components/ErrorFatalPage'
import ErrorBoundary from './components/ErrorBoundary'
import { fetchConfig } from './slices/configSlice'
import './App.scss'
import styled from '@emotion/styled'
import Nav from './components/Nav'

const AppContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

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
    const isLoading = loading === 'pending'
    const hasTheme = !isLoading && !error && theme
    return (
      <>
        <ErrorFatalPage error={error} loading={loading} />
        {hasTheme && (
          <ThemeProvider theme={this.props.theme}>
            <GlobalStyles />
            <ErrorBoundary>
              <AppContainer>
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
                  <Messages />
                  <Routes />
                  <Notifications />
                  <CartButton />
                  <Sidebar />
                  <Nav />
                </Router>
              </AppContainer>
            </ErrorBoundary>
          </ThemeProvider>
        )}
      </>
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
