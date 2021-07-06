import React from 'react'
import { MenuContent } from '../../../HighlightedMenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectRevenueCenter } from '@open-tender/redux'
import CallUsButton from '../CallUsButton'
import ChatButton from '../ChatButton'
import styled from '@emotion/styled'

const ContactsContainer = styled.div`
  label: ContactsMessageContainer;
`;

const ContactsMessage = styled.div`
  label: ContactsMessage;
  
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.pepper};
  font-family: ${(props) => props.theme.fonts.headings.family};
  font-size: 24px;
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  margin: 5px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 20px;
  }
`

const ContactsSubMessage = styled.div`
  label: ContactsSubMessage;
  
  text-align: center;
`;

const ContactsMessageButtons = styled.div`
  label: ContactsMessageButtons;
  
  display: grid;
  grid-template-columns: 48% 48%;
  gap: 4%;
  justify-content: center;
  margin-top: 1rem;
  
  
  > button, > a {
    width: 100%
  }
`;

const ContactsCTA = () => (
  <ContactsContainer>
    <ContactsMessage>Can't wait?</ContactsMessage>
    <ContactsSubMessage>Contact us directly</ContactsSubMessage>
    <ContactsMessageButtons>
      <CallUsButton/>
      <ChatButton/>
    </ContactsMessageButtons>
  </ContactsContainer>
)

const SentBigEventFormStage = () => {

  const revenueCenter =
    useSelector(selectRevenueCenter)

  return (
    <>
      <MenuContent
        title="Request sent!"
        subtitle="We will contact you shortly!"
      >
        <Link to={`/menu/${revenueCenter.slug}`}>Back to your Roti!</Link>
        <ContactsCTA />
      </MenuContent>
    </>
  )
}

export default SentBigEventFormStage;
