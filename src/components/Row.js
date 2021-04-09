import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const RowView = styled('div')`
  display: flex;
  align-items: center;
  padding: 2rem;
  margin: 0 0 2rem;
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.secondary};
`

const RowIcon = styled('div')`
  flex: 0 0 auto;
  margin: 0 2rem 0 0;
`

const RowContent = styled('div')`
  flex: 1 1 auto;
`

const RowHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RowLines = styled('div')`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    display: block;
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-size: 1.7rem;
    line-height: 1.35;
  }
`

const RowTitle = styled(Preface)`
  font-size: 2.2rem;
  font-weight: 500;
  letter-spacing: 0.01em;
`

const RowActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    display: block;
    margin: 0 0 0 1rem;
    transform: scale(1)
    transition: ${(props) => props.theme.links.transition};

    &:hover,
    &:active,
    &:focus {
      transform: scale(1.2)
      // svg {
      //   fill: ${(props) => props.theme.links.primary.hover};
      // }
    }
  }
`

const Row = ({ icon, title, actions, children }) => {
  return (
    <RowView>
      {icon && <RowIcon>{icon}</RowIcon>}
      <RowContent>
        <RowHeader>
          <div>
            <RowTitle as="h2">{title}</RowTitle>
          </div>
          <RowActions>{actions}</RowActions>
        </RowHeader>
        <RowLines>{children}</RowLines>
      </RowContent>
    </RowView>
  )
}

Row.displayName = 'Row'
Row.propTypes = {
  icon: propTypes.element,
  title: propTypes.string,
  actions: propTypes.element,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Row
