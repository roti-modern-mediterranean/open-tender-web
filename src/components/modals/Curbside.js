import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { ButtonStyled, Preface } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ButtonGroupBig, ModalContent, ModalView, PrefaceTitle } from '..'
import { CurbsidePickup } from '../icons'

const CurbsideHeader = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1.5rem;

  span {
    display: block;

    &:first-of-type {
      font-weight: bold;
      font-size: 2.6rem;
      margin: 0 0 1.5rem;
    }
  }
`

const CurbsideContent = styled('span')`
  display: block;
  margin: 0 0 2rem;

  p {
    line-height: ${(props) => props.theme.lineHeight};
  }

  p:first-of-type {
    margin: 2rem 0 1rem;
  }
`

const Curbside = ({ handlePickup }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const color = theme.colors.secondary

  const handleContinue = () => {
    handlePickup(true)
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent>
        <CurbsideHeader>
          <Preface>Curbside Pickup</Preface>
          <CurbsidePickup color={color} />
        </CurbsideHeader>
        <CurbsideContent>
          <PrefaceTitle as="p">Curbside Explanation</PrefaceTitle>
          <p>
            Viverra aliquam sit hendrerit egestas pretium aliquam. Natoque
            blandit vitae posuere suspendisse eget eget sed pellentesque ut.
            Tortor placerat vitae arcu id. Vel morbi plavida.
          </p>
        </CurbsideContent>
        <ButtonGroupBig>
          <ButtonStyled onClick={handleContinue}>Continue</ButtonStyled>
          <ButtonStyled
            onClick={() => dispatch(closeModal())}
            color="secondary"
          >
            Cancel
          </ButtonStyled>
        </ButtonGroupBig>
      </ModalContent>
    </ModalView>
  )
}

Curbside.displayName = 'Curbside'

export default Curbside
