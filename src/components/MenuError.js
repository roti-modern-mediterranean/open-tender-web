import React, { useContext } from 'react'
import { Button } from '@open-tender/components'

import { MenuContext } from './MenuPage'
import ErrorMessage from './ErrorMessage'
import iconMap from './iconMap'

const MenuError = () => {
  const { error, changeRevenueCenter } = useContext(MenuContext)
  return error ? (
    <ErrorMessage title="Menu Not Found" msg={error}>
      <Button
        text="Change Location"
        icon={iconMap['RefreshCw']}
        classes="ot-btn ot-btn--cancel"
        onClick={changeRevenueCenter}
      />
    </ErrorMessage>
  ) : null
}

MenuError.displayName = 'MenuError'

export default MenuError
