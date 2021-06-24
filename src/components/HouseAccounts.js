import propTypes from 'prop-types'
import { orderTypeNamesMap, serviceTypeNamesMap } from '@open-tender/js'

import { QRCode, Row } from '.'

const HouseAccounts = ({ houseAccounts }) => {
  return (
    <div>
      {houseAccounts.map((houseAccount) => {
        const orderType = orderTypeNamesMap[houseAccount.order_type]
        const orderTypes = orderType ? `${orderType} orders` : 'all order types'
        const serviceType = serviceTypeNamesMap[houseAccount.service_type]
        const serviceTypes = serviceType
          ? `the ${serviceType} service type`
          : 'all service types'
        return (
          <Row
            key={houseAccount.house_account_id}
            icon={
              houseAccount.qr_code_url ? (
                <QRCode
                  src={houseAccount.qr_code_url}
                  alt={`House Account ${houseAccount.pin}`}
                />
              ) : null
            }
            title={houseAccount.name}
          >
            <div>
              <p>
                {houseAccount.approved_contact
                  ? 'Your account has been specifically approved for this house account'
                  : `This house account is approved for all email addresses ending in ${houseAccount.domain}`}
              </p>
            </div>
            <div>
              <p>
                Approved for <span>{orderTypes}</span> and{' '}
                <span>{serviceTypes}</span>
              </p>
            </div>
          </Row>
        )
      })}
    </div>
  )
}

HouseAccounts.displayName = 'HouseAccounts'
HouseAccounts.propTypes = {
  houseAccounts: propTypes.array,
}

export default HouseAccounts
