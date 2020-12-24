import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Box = styled('div')`
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.bgColors.primary};
`

const RowView = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
`

const RowIcon = styled('div')`
  flex: 0 0 auto;
`

const RowContent = styled('div')`
  padding: 0 0 0 2rem;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const RowText = styled('div')`
  flex: 1;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.lineHeight};

    &:first-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.main};
      color: ${(props) => props.theme.fonts.headings.color};
    }
  }
`

const RowActions = styled('div')`
  flex-shrink: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 0;
  }
`

const Row = ({ icon, content, actions }) => {
  return (
    <RowView>
      <RowIcon>{icon}</RowIcon>
      <RowContent>
        <RowText>{content}</RowText>
        {actions && <RowActions>{actions}</RowActions>}
      </RowContent>
    </RowView>
  )
}

Row.displayName = 'Row'
Row.propTypes = {
  icon: propTypes.element,
  content: propTypes.element,
  actions: propTypes.element,
}

export default Row
