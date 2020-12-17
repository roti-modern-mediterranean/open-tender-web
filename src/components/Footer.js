import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_footer.png'

const Footer = ({ hasRouter = true }) => {
  return (
    <footer className="footer ot-dark" role="contentinfo">
      <div className="container">
        <div className="footer__container">
          <div className="footer__logo">
            <span className="ot-font-size-small">Powered by</span>
            <img src={logo} className="logo" alt="logo" />
          </div>
          <nav className="footer__nav ot-font-size-small">
            <ul>
              <li>
                <a
                  className="no-link ot-link-light"
                  href="https://demo.brandibble.co/order/terms/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  className="no-link ot-link-light"
                  href="https://demo.brandibble.co/order/privacy/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Privacy
                </a>
              </li>
              {hasRouter && (
                <>
                  <li>
                    <Link to="/accessibility" className="no-link ot-link-light">
                      Accessibility
                    </Link>
                  </li>
                  <li>
                    <Link to="/refunds" className="no-link ot-link-light">
                      Refunds
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
