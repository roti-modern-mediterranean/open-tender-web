import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const AccountRewardsImageView = styled('div')`
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  // border-radius: 0.5rem;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.secondary};

  img {
    height: 4.5rem;
    width: auto;
    max-width: none;
  }
`

const AccountRewardsImage = ({ imageUrl, title }) => {
  return (
    <AccountRewardsImageView>
      <img src={imageUrl} title={title} alt={title} />
    </AccountRewardsImageView>
  )
}

AccountRewardsImage.displayName = 'AccountRewardsImage'
AccountRewardsImage.propTypes = {
  imageUrl: propTypes.string,
  title: propTypes.string,
}

export default AccountRewardsImage
