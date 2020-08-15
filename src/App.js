import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'
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
import ErrorFatalPage from './components/ErrorFatalPage'
import ErrorBoundary from './components/ErrorBoundary'
import { fetchConfig } from './slices/configSlice'
import './App.scss'

// const gtmScript = (gtmId) => {
//   const cleanId = gtmId.replace('GTM-', '')
//   return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-${cleanId}');`
// }

class App extends React.Component {
  componentDidMount() {
    this.props.fetchConfig()
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
              {/* <script type="application/ld+json">{gtmScript('MLR3VV8')}</script> */}
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
