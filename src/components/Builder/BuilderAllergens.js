import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

import { selectTheme } from '../../slices'
import { allergenIconMap } from '../icons/allergens'

const BuilderAllergensView = styled('p')`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    text-align: center;
  }

  & > span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 2rem 0 0;
  }
`

const BuilderAllergensIcon = styled('span')`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.4rem 0 0;
  line-height: 0;
  width: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 1.6rem;
  }

  & > span {
    width: 100%;
  }
`

const BuilderAllergensName = styled(Heading)`
  display: inline-block;
  vertical-align: middle;
  font-weight: 600;
  line-height: 1.05;
  color: ${(props) => props.theme.colors.alert};
  font-size: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 1.6rem;
  }
`

const BuilderAllergens = ({ allergens, includeText = true, style = null }) => {
  const theme = useSelector(selectTheme)
  if (!allergens.length) return null

  return (
    <BuilderAllergensView style={style}>
      {allergens.map((allergen) => (
        <span>
          <BuilderAllergensIcon>
            {allergenIconMap[allergen]({ color: theme.colors.alert })}
          </BuilderAllergensIcon>
          {includeText && (
            <BuilderAllergensName>{allergen}</BuilderAllergensName>
          )}
        </span>
      ))}
    </BuilderAllergensView>
  )
}

BuilderAllergens.displayName = 'BuilderAllergens'
BuilderAllergens.propTypes = {
  allergens: propTypes.array,
  includeText: propTypes.bool,
  style: propTypes.object,
}

export default BuilderAllergens
