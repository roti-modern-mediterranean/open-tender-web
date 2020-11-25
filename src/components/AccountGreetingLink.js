import React from 'react'
import { Link } from 'react-scroll'
import { slugify } from '@open-tender/js'

const AccountGreetingLink = ({ sectionTitle, text }) => (
  <Link
    activeClass="active"
    className="link"
    to={slugify(sectionTitle)}
    spy={true}
    smooth={true}
    offset={-90}
  >
    {text}
  </Link>
)

AccountGreetingLink.displayName = 'AccountGreetingLink'

export default AccountGreetingLink
