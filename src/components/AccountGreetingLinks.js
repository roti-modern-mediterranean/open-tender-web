import React from 'react'
import { useSelector } from 'react-redux'

import { selectAccountConfig } from '../slices'
import AccountGreetingLink from './AccountGreetingLink'

const AccountGreetingLinks = () => {
  const config = useSelector(selectAccountConfig)

  return (
    <div className="greeting__summary__options">
      <p className="ot-font-size-small ot-bold ot-color-headings">
        Other things you can do from here...
      </p>
      <ul className="ot-font-size-small">
        <li>
          <span>
            Reorder from your{' '}
            <AccountGreetingLink
              sectionTitle={config.favorites.title}
              text="favorites"
            />{' '}
            or{' '}
            <AccountGreetingLink
              sectionTitle={config.recentItems.title}
              text="recently ordered items"
            />
          </span>
        </li>
        <li>
          <span>
            Update your{' '}
            <AccountGreetingLink
              sectionTitle={config.profile.title}
              text="profile"
            />
            ,{' '}
            <AccountGreetingLink
              sectionTitle={config.allergens.title}
              text="allergens"
            />{' '}
            or{' '}
            <AccountGreetingLink
              sectionTitle={config.creditCards.title}
              text="cards on file"
            />
          </span>
        </li>
        <li>
          <span>
            Manage your{' '}
            <AccountGreetingLink
              sectionTitle={config.addresses.title}
              text="addresses"
            />{' '}
            and{' '}
            <AccountGreetingLink
              sectionTitle={config.giftCards.title}
              text="gift cards"
            />
          </span>
        </li>
      </ul>
    </div>
  )
}

AccountGreetingLinks.displayName = 'AccountGreetingLinks'

export default AccountGreetingLinks
