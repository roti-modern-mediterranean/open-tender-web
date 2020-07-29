import React, { useContext } from 'react'

import { MenuContext } from './MenuPage'
import Loader from './Loader'

const MenuLoading = () => {
  const { isLoading, loadingMessage } = useContext(MenuContext)
  return isLoading ? (
    <div className="menu__loading ot-opacity-light">
      <Loader text={loadingMessage} />
    </div>
  ) : null
}

MenuLoading.displayName = 'MenuLoading'

export default MenuLoading
