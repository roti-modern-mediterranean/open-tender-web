import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Container from './Container'
import Preface from './Preface'

const PageTitleContainer = styled('div')`
  padding: 4rem 0;
  // opacity: 0;
  // animation: slide-up 0.25s ease-in-out 0.125s;
`

const PageTitlePreface = styled('p')`
  margin: 0 0 0.25rem;
`

const PageTitleTitle = styled('h1')`
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fonts.sizes.h1};
  margin: 0 0 0 -0.2rem;
`

const PageTitleSubtitle = styled('p')`
  color: ${(props) =>
    props.isError ? props.theme.colors.error : props.theme.fonts.body.color};
  line-height: ${(props) => props.theme.lineHeight};
  margin: 1rem 0 0;
`

const PageTitle = ({ title, subtitle, preface, error, link }) => {
  return (
    <PageTitleContainer>
      <Container>
        {!!preface && (
          <PageTitlePreface>
            <Preface>{preface}</Preface>
          </PageTitlePreface>
        )}
        <PageTitleTitle>{title}</PageTitleTitle>
        {!!subtitle && <PageTitleSubtitle>{subtitle}</PageTitleSubtitle>}
        {!!error && (
          <PageTitleSubtitle isError={true}>{error}</PageTitleSubtitle>
        )}
        {!!link && (
          <PageTitleSubtitle style={{ margin: '4rem 0 0' }}>
            {link}
          </PageTitleSubtitle>
        )}
      </Container>
    </PageTitleContainer>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  error: propTypes.oneOfType([propTypes.string, propTypes.element]),
  link: propTypes.element,
}

export default PageTitle
