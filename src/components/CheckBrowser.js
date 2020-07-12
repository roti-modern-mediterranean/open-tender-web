import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { Check } from '@open-tender/components'
import { BarLoader } from 'react-spinners'

const CheckBrowser = ({ title, check, tenders, updating }) => {
  const showCheck = check && check.totals && isBrowser
  return showCheck ? (
    <div className="checkout__check">
      <div className="checkout__check__wrapper ot-border-color">
        <div className="checkout__check__totals ot-border-radius ot-bg-color-primary ot-box-shadow slide-up">
          <Check
            title={title}
            check={check}
            tenders={tenders}
            updating={updating}
            loader={<BarLoader />}
          />
        </div>
      </div>
    </div>
  ) : null
}

CheckBrowser.displayName = 'CheckBrowser'
CheckBrowser.propTypes = {
  title: propTypes.string,
  check: propTypes.object,
  tenders: propTypes.array,
  updating: propTypes.bool,
}

export default CheckBrowser
