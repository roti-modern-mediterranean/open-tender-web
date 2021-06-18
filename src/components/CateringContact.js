import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import { useState } from 'react'
import { CallUs, Chat } from './icons'
import CallUsButton from './pages/Catering/CallUsButton'
import ChatButton from './pages/Catering/ChatButton'

const CateringContactView = styled('div')`
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 2rem 0 0;
  }
`

const CateringContactHeader = styled('div')`
  margin: 0 0 1.5rem;

  p + p {
    margin: 0.5rem 0 0;
    font-weight: 500;
    font-size: 2.2rem;
  }
`

const CateringContactButtons = styled('div')`
  display: flex;

  a,
  button {
    width: 16.4rem;
    height: 4.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 1.7rem;
    border-radius: ${(props) => props.theme.border.radius};
    border: 0.1rem solid ${(props) => props.theme.colors.paprika};
    background-color: transparent;

    span {
      color: ${(props) => props.theme.colors.paprika};
      line-height: 1;
      transition: ${(props) => props.theme.links.transition};

      &:first-of-type {
        padding: 0 0 0.2rem;
      }

      svg path,
      svg circle {
        transition: ${(props) => props.theme.links.transition};
      }
    }

    &:hover,
    &:active,
    &:focus {
      border: 0.1rem solid ${(props) => props.theme.links.primary.hover};
      background-color: ${(props) => props.theme.links.primary.hover};

      span {
        color: ${(props) => props.theme.colors.light};
      }

      span:last-of-type path,
      span:last-of-type circle {
        stroke: ${(props) => props.theme.colors.light};
      }
    }
  }

  a + button {
    margin: 0 0 0 1.5rem;
  }
`

const CateringContact = () => {

  return (
    <CateringContactView>
      <CateringContactHeader>
        <p>Can't find what you're looking for?</p>
        <Preface as="p">Chat or call a representative</Preface>
      </CateringContactHeader>
      <CateringContactButtons>
        <CallUsButton/>
        <ChatButton/>
      </CateringContactButtons>
    </CateringContactView>
  )
}

export default CateringContact
