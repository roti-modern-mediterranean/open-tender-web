import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_footer.png'

const Footer = () => {
  return (
    <footer className="footer ot-dark">
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
                  Privacy Policy
                </a>
              </li>
              <li>
                <Link to="/refunds" className="no-link ot-link-light">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
