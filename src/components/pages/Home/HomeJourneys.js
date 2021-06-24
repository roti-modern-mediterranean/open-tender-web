import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { selectGroupOrder, selectMenuSlug } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { Container } from '../..'
import BorderBox from '../../BorderBox'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../slices'

const HomeJourneysView = styled('div')`
  position: relative;
  background-color: ${(props) => props.theme.bgColors.secondary};
  padding: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const HomeJourneysItems = styled('div')`
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin: 0 -1.5%;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-wrap: wrap;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-wrap: no-wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
`

const HomeJourneyView = styled('div')`
  width: 22.75%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 40%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0;
    margin: 0 0 5rem;
    max-width: 36rem;
    background-color: transparent;
    border-radius: 0;
  }

  &:last-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-bottom: 0;
    }
  }
`

const HomeJourneyContent = styled('div')`
  flex: 1;
  text-align: center;
  margin: 0 0 3rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 2rem;
  }

  h3 {
    line-height: 1;
    min-height: 2em;
  }

  p {
    margin: 0.5rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const HomeJourneyFooter = styled('div')`
  flex: 0;

  button {
    width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      display: block;
      width: 28rem;
      margin: 0 auto;
    }

    &:last-of-type {
      box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.2);
    }
  }

  button + button {
    margin-top: 1.5rem;
  }
`

const HomeJourney = ({ title, subtitle, footer }) => {
  return (
    <HomeJourneyView>
      <HomeJourneyContent>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </HomeJourneyContent>
      <HomeJourneyFooter>{footer}</HomeJourneyFooter>
    </HomeJourneyView>
  )
}

HomeJourney.displayName = 'HomeJourney'
HomeJourney.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  footer: propTypes.element,
}

const HomeJourneys = () => {
  const history = useHistory()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { cartId } = useSelector(selectGroupOrder)
  const menuSlug = useSelector(selectMenuSlug)

  const groupOrder = () => {
    if (cartId) {
      const reviewOrders = () => history.push(`/review`)
      dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
      history.push(menuSlug)
    } else {
      dispatch(openModal({ type: 'groupOrderInfo' }))
    }
  }

  const journeys = [
    {
      title: 'Build Your Own',
      subtitle:
        'Select your base, choose mains, sides, toppings, and sauces to make it your own.',
      footer: (
        <ButtonStyled onClick={() => history.push('/locations')} size="big">
          Build Your Own Meal
        </ButtonStyled>
      ),
    },
    {
      title: 'Cater with us',
      subtitle: 'Let us take care of your event, meeting, or party.',
      footer: (
        <>
          {/* <ButtonStyled
            onClick={() => history.push('/locations')}
            color="secondary"
            size="big"
            style={{ backgroundColor: 'transparent' }}
          >
            Build Your Experience
          </ButtonStyled> */}
          <ButtonStyled onClick={() => history.push('/catering')} size="big">
            Get Started
          </ButtonStyled>
        </>
      ),
    },
    {
      title: 'Group Ordering',
      subtitle:
        'Allow your friends, family, or colleagues to order their own items as part of a single pickup or delivery order',
      footer: (
        <ButtonStyled onClick={groupOrder} size="big">
          Begin Your Order
        </ButtonStyled>
      ),
    },
    {
      title: 'Curbside Pickup',
      subtitle:
        'Get all your favorites from the safety and convenience of your own car',
      footer: (
        <ButtonStyled onClick={() => history.push('/locations')} size="big">
          Order Now
        </ButtonStyled>
      ),
    },
  ]

  return (
    <HomeJourneysView>
      <BorderBox color={theme.bgColors.secondary} />
      <BorderBox color={theme.bgColors.primary} position="right" />
      <Container>
        <HomeJourneysItems>
          {journeys.map((journey) => (
            <HomeJourney key={journey.title} {...journey} />
          ))}
        </HomeJourneysItems>
      </Container>
    </HomeJourneysView>
  )
}

HomeJourneys.displayName = 'HomeJourneys'
export default HomeJourneys
