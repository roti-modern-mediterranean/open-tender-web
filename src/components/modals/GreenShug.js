import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled, Heading, Preface } from '@open-tender/components'

import { closeModal, setModalPref } from '../../slices'
import { ButtonGroupBig, ModalClose, ModalView } from '..'

const GreenShugView = styled('div')`
  position: relative;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const GreenShugHeader = styled('div')`
  padding: 4rem 4rem 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem 3rem 1rem;
  }
`

const GreenShugTitle = styled('div')`
  p {
    font-size: ${(props) => props.theme.fonts.sizes.h2};
    line-height: 0.9;
    color: ${(props) => props.theme.colors.primary};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 3.2rem;
    }
  }
`

const GreenShugSubtitle = styled(Preface)`
  font-size: 3.2rem;
  line-height: 1 !important;
  font-weight: 500;
  margin: 0 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.6rem;
  }
`

const GreenShugContent = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    // align-items: flex-end;
  }

  & > div {
    flex-grow: 1;
    padding: 0 0 4rem 4rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 0 3rem 3rem 3rem;
      // max-width: 50%;
    }
  }

  img {
    display: block;
    width: 40%;
    flex-grow: 0;
    flex-shrink: 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      position: absolute;
      top: 14rem;
      right: 0;
      width: auto;
      height: 24rem;
      // margin-top: -12rem;
    }
  }

  button {
    max-width: 24rem;
    font-size: 2.8rem;
    padding: 0.8rem 2rem 0.9rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      max-width: 100%;
    }
  }
`

const GreenShugMessage = styled('p')`
  margin: 4rem 0 3rem;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: 2.1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
    margin: 3rem 0 3rem;
    width: 60%;
  }
`

const GreenShug = () => {
  const dispatch = useDispatch()
  const imageUrl =
    'https://s3.amazonaws.com/betterboh/u/img/prod/46/1620785520_green-shug_614x951.png'

  const dismiss = () => {
    dispatch(setModalPref({ modal: 'greenShug', pref: true }))
    dispatch(closeModal())
  }

  return (
    <ModalView style={{ width: '60rem' }}>
      <ModalClose />
      <GreenShugView>
        {/* <BackgroundImage imageUrl={imageUrl} /> */}
        <GreenShugHeader>
          <GreenShugTitle>
            <Heading as="p">Out of Green S'hug,</Heading>
            <Heading as="p">Hate to say it</Heading>
          </GreenShugTitle>
        </GreenShugHeader>
        <GreenShugContent>
          <div>
            <GreenShugSubtitle as="p">
              Time to discover a world of possibilities!
            </GreenShugSubtitle>
            <GreenShugMessage>
              We know you love our green s’hug (we do, too)... no worries, it’ll
              be back soon. In the meantime, try one of our other sauces and
              maybe find a new favorite (we won’t tell s’hug about it)!
            </GreenShugMessage>
            <ButtonGroupBig>
              <ButtonStyled onClick={dismiss} size="big">
                Dismiss
              </ButtonStyled>
            </ButtonGroupBig>
          </div>
          <img src={imageUrl} alt="Green S'hug" />
        </GreenShugContent>
        {/* <GreenShugFooter>
          <ButtonStyled onClick={dismiss}>Dismiss</ButtonStyled>
        </GreenShugFooter> */}
      </GreenShugView>
    </ModalView>
  )
}

GreenShug.displayName = 'GreenShug'

export default GreenShug
