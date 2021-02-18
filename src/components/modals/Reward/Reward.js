import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled, Heading, Text } from '@open-tender/components'

import { closeModal } from '../../../slices'
import { ModalContent, ModalView } from '../..'
import RewardQRCode from './RewardQRCode'
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

const Reward = ({ reward }) => {
  const dispatch = useDispatch()
  const { title, description, image_url, qr_code_url, expiration } = reward

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent>
        <RewardView>
          <RewardHeader>
            <Heading as="p">{title}</Heading>
            {description && <p>{description}</p>}
            <Text color="alert" size="small" as="p">
              Use by {expiration}
            </Text>
          </RewardHeader>
          <RewardContent>
            {qr_code_url ? (
              <>
                <p>Scan to redeem in-store</p>
                <RewardQRCode src={qr_code_url} title={title} />
              </>
            ) : image_url ? (
              <RewardImage src={image_url} alt={title} />
            ) : null}
            <p>
              To redeem online, add the relevant items to your cart and apply
              this reward on the Checkout page
            </p>
          </RewardContent>
          <div>
            <ButtonStyled color="cart" onClick={() => dispatch(closeModal())}>
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
