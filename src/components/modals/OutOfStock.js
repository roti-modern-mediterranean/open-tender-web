import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { BgImage, ButtonStyled, Heading } from '@open-tender/components'

import { closeModal, setModalPref } from '../../slices'
import { ModalClose, ModalView } from '..'

const OutOfStockView = styled(BgImage)`
  position: relative;
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 4rem 4rem 4.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem 3rem 3.5rem;
  }
`

const OutOfStockHeader = styled('div')``

const OutOfStockTitle = styled('div')`
  text-align: center;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.h2};
    line-height: 1.05;
    color: ${(props) => props.theme.colors.paprika};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 3.2rem;
    }
  }
`

const OutOfStockContent = styled('div')`
  padding: 1rem 0 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }

  p {
    margin: 1em 0;
  }
`

const OutOfStockFooter = styled('div')`
  text-align: center;

  button {
    max-width: 24rem;
    font-size: 2.8rem;
    padding: 0.8rem 2rem 0.9rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: 100%;
      font-size: 2.3rem;
    }
  }
`

const OutOfStock = (props) => {
  const dispatch = useDispatch()
  const { content, files = [] } = props || {}
  const image = files.find((i) => i.type === 'FEATURED_IMAGE')
  const bgStyle = image ? { backgroundImage: `url(${image.url}` } : null

  const dismiss = () => {
    dispatch(setModalPref({ modal: 'outOfStock', pref: true }))
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalClose />
      <OutOfStockView style={bgStyle}>
        <OutOfStockHeader>
          <OutOfStockTitle>
            <Heading as="p">Ummm...</Heading>
            <Heading as="p">What's Going On Here?</Heading>
          </OutOfStockTitle>
        </OutOfStockHeader>
        <OutOfStockContent>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </OutOfStockContent>
        <OutOfStockFooter>
          <ButtonStyled onClick={dismiss}>Okay, Got It</ButtonStyled>
        </OutOfStockFooter>
      </OutOfStockView>
    </ModalView>
  )
}

OutOfStock.displayName = 'OutOfStock'

export default OutOfStock
