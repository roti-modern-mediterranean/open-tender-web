import React from 'react'
import logo from '../assets/logo_footer.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer ot-dark">
      <div className="footer__container container flex">
        <div className="footer__logo">
          <span className="ot-font-size-small">Powered by</span>
          <img src={logo} className="logo" alt="logo" />
        </div>
        <nav className="footer__nav">
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
                Pricvacy Policy
              </a>
            </li>
            <li>
              <Link to="/refunds" className="no-link ot-link-light">
                Refunds
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
