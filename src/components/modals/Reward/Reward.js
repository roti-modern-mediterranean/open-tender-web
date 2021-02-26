import React, { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled, Heading, Text } from '@open-tender/components'

import { closeModal } from '../../../slices'
import { ModalContent, ModalView, QRCode } from '../..'
import RewardImage from './RewardImage'

const RewardView = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0;
  text-align: center;
`

const RewardHeader = styled('div')`
  & > p {
    margin: 0;
  }

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: 1.2;
    margin: 0;
  }

  p + p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: 1.2;
    margin: 1rem 0 0;
  }
`

const RewardContent = styled('div')`
  margin: 1.5rem 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RewardQRCodeView = styled('div')`
  width: 16rem;
  margin: 0 auto;
`

const Reward = ({ reward }) => {
  const dispatch = useDispatch()
  const { title, description, imageUrl, expiration, service_type } = reward
  const [qrCodeUrl, setQRCodeUrl] = useState(null)
  const hasQRCode = !service_type || service_type === 'WALKIN'

  const scan = () => {
    console.log('retrieve QR code')
  }

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent>
        <RewardView>
          <RewardHeader>
            <Heading as="p">{title}</Heading>
            {description && <p>{description}</p>}
            {expiration ? (
              <Text color="alert" size="small" as="p">
                Use by {expiration}
              </Text>
            ) : (
              <Text size="small" as="p">
                Expires never!
              </Text>
            )}
            {reward.per_order === 1 && (
              <Text color="alert" size="small" as="p">
                Cannot be used with any other discounts
              </Text>
            )}
          </RewardHeader>
          <RewardContent>
            {qrCodeUrl ? (
              <>
                <p>Scan to redeem in-store</p>
                <RewardQRCodeView>
                  <QRCode src={qrCodeUrl} alt={title} />
                </RewardQRCodeView>
              </>
            ) : imageUrl ? (
              <RewardImage src={imageUrl} alt={title} />
            ) : null}
            {hasQRCode && !qrCodeUrl && (
              <p>
                <ButtonStyled color="cart" onClick={scan}>
                  Scan In-store
                </ButtonStyled>
              </p>
            )}
            <p>
              To redeem online, add the relevant items to your cart and apply
              this reward on the Checkout page
            </p>
          </RewardContent>
          <div>
            <ButtonStyled onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        </RewardView>
      </ModalContent>
    </ModalView>
  )
}

Reward.displayName = 'Reward'
Reward.prototypes = {
  reward: propTypes.object,
}

export default Reward
