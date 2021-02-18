import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink, Heading, Preface } from '@open-tender/components'

import { OrderImage } from '../..'
import { openModal } from '../../../slices'
import { useDispatch } from 'react-redux'
import iconMap from '../../iconMap'

const AccountRewardsListView = styled('div')`
  width: 100%;
  margin: 2rem 0 0;

  & > div {
    width: 100%;
    overflow-x: scroll;
    padding: 1rem 0 1rem 2rem;
    display: flex;
  }

  > p {
    text-transform: uppercase;
    font-weight: ${(props) => props.theme.boldWeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const AccountRewardsItem = styled('div')`
  flex: 0 0 22rem;
  padding: 0 1rem 0 0;

  &:last-of-type {
    flex: 0 0 23rem;
    padding: 0 2rem 0 0;
  }

  & > div {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    background-color: ${(props) => props.theme.bgColors.primary};
    // border-radius: ${(props) => props.theme.border.radiusSmall};
    // box-shadow: ${(props) => props.theme.boxShadow.outer};
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem 0rem rgba(0, 0, 0, 0.6);
  }
`

// const AccountRewardsItemImageView = styled('div')`
//   width: 4.5rem;
//   height: 4.5rem;
//   flex-shrink: 0;
//   margin-right: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
//   border-radius: 0.5rem;

//   img {
//     height: 4.5rem;
//     width: auto;
//     max-width: none;
//   }
// `

// const AccountRewardsItemImage = ({ imageUrl, title }) => {
//   return (
//     <AccountRewardsItemImageView>
//       <img src={imageUrl} title={title} alt={title} />
//     </AccountRewardsItemImageView>
//   )
// }

// AccountRewardsItemImage.displayName = 'AccountRewardsItemImage'
// AccountRewardsItemImage.propTypes = {
//   imageUrl: propTypes.string,
//   title: propTypes.string,
// }

const AccountRewardsItemDetails = styled('div')`
  flex: 1 1 auto;
  text-align: left;

  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    // width: 100%;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }

  & > p + p {
    margin: 0.3rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const AccountRewardsItemAction = styled('div')`
  margin: 0 0 0 0.5rem;

  button {
    width: 2.4rem;
    height: 2.4rem;
  }
`

const AccountRewardsList = ({ rewards }) => {
  const dispatch = useDispatch()
  if (!rewards.length) return null

  const redeem = () => {
    dispatch(openModal({ type: 'reward' }))
  }

  return (
    <AccountRewardsListView>
      <Preface as="p">
        {rewards.length > 1
          ? `You have ${rewards.length} rewards!`
          : 'You have a reward'}
      </Preface>
      <div>
        {rewards.map((reward) => (
          <AccountRewardsItem key={reward.id}>
            <div>
              {/* <AccountRewardsItemImage
                imageUrl={reward.image_url}
                title={reward.name}
              /> */}
              <OrderImage imageUrl={reward.image_url} title={reward.name} />
              <AccountRewardsItemDetails>
                <Heading as="p">{reward.name}</Heading>
                <p>Use by {reward.expiration}</p>
              </AccountRewardsItemDetails>
              <AccountRewardsItemAction>
                {/* <ButtonStyled onClick={redeem} size="small">
                  Redeem
                </ButtonStyled> */}
                <ButtonLink
                  onClick={redeem}
                  disabled={false}
                  label={`Apply ${reward.name}`}
                >
                  {iconMap.PlusCircle}
                </ButtonLink>
              </AccountRewardsItemAction>
            </div>
          </AccountRewardsItem>
        ))}
      </div>
    </AccountRewardsListView>
  )
}

AccountRewardsList.displayName = 'RewardsProgram'
AccountRewardsList.propTypes = {
  rewards: propTypes.object,
}

export default AccountRewardsList
