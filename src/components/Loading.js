import React from 'react'
import propTypes from 'prop-types'
import { BarLoader, ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'

const loader = (type, size) => {
  switch (type) {
    case 'Clip':
      return <ClipLoader size={size} loading={true} />
    default:
      return <BarLoader size={size} loading={true} />
  }
}

const LoadingView = styled('div')`
  text-align: left;
`

const LoadingLoader = styled('div')`
  display: inline-block;
`

const LoadingMessage = styled('p')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const Loading = ({ type, text, size = 100, style = null }) => (
  <LoadingView style={style}>
    <LoadingLoader>{loader(type, size)}</LoadingLoader>
    {text && text.length > 0 && <LoadingMessage>{text}</LoadingMessage>}
  </LoadingView>
)

Loading.displayName = 'Loading'
Loading.propTypes = {
  type: propTypes.string,
  size: propTypes.number,
  text: propTypes.string,
  style: propTypes.object,
}

export default Loading
