import propTypes from 'prop-types'
import styled from '@emotion/styled'
import iconMap from '../../iconMap'
import { Preface } from '@open-tender/components'

const RevenueCentersAlertView = styled('div')`
  margin: 2rem 0;

  p:first-of-type {
    display: flex;
    align-items: center;
    line-height: 1;
    color: ${(props) => props.theme.colors.alert};

    span {
      display: block;
      font-weight: 500;
      color: ${(props) => props.theme.colors.alert};
      font-size: 1.8rem;
    }

    span:first-of-type {
      width: 2rem;
      height: 2rem;
      margin: 0 1rem 0 0;
      line-height: 0;
    }
  }

  p + p {
    margin: 0.5rem 0 0 3rem;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};
  }

  div {
    margin: 2rem 0 0 3rem;
  }
`

const RevenueCentersAlert = ({ title, subtitle, children }) => {
  return (
    <RevenueCentersAlertView>
      <p>
        <span>{iconMap.AlertTriangle}</span>
        <Preface>{title}</Preface>
      </p>
      <p>{subtitle}</p>
      <div>{children}</div>
    </RevenueCentersAlertView>
  )
}

RevenueCentersAlert.displayName = 'RevenueCentersAlert'
RevenueCentersAlert.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default RevenueCentersAlert
