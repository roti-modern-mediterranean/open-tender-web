import React from 'react'
import styled from '@emotion/styled'
import QuestionMark from '../../icons/QuestionMark'

const Container = styled.div`
  label: RecommendationContainer;

  width: 100%;
  display: grid;
  grid-template-rows: max-content auto max-content;
  color: ${(props) => props.theme.colors.light};
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 6rem ${(props) => props.theme.layout.paddingMobile} 0;
    text-align: center;
    max-width: 44rem;
    margin: 0 auto;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding-top: 3rem;
  }

`;

const Header = styled.h2`
  label: RecommendationHeader;
  
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  margin: 0 0 1rem;
  font-size: 7rem;
  line-height: 0.9;
  text-align: center;
  width: 100%;
  
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: 5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-family: ${(props) => props.theme.fonts.preface.family};
    font-weight: 500;
    font-size: 2.8rem;
    letter-spacing: 0.01em;
  }
`;

const Recommendations = styled.div`
  label: Recommendations;


`;

const Footer = styled.div`
  label: RecommendationFooter;

  border-top: 1px solid #FFFFFF44;
  padding-top: 20px;
  display: grid;
  grid-template-columns: fit-content(40%) max-content;
  justify-content: center;
`;

const FooterLeft = styled.div`
  label: FooterLeft;

  border-right: 1px solid #FFFFFF44;
  padding: 0px 10px;
`;

const FooterLeftHighlight = styled.div`
  label: FooterLeftHighlight;

  display: grid;
  grid-template-columns: 30px max-content;
  grid-column-gap: 5px;
  align-items: center;
  font-family: 'Barlow', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
`

const FooterLeftBody = styled.div`
  label: FooterLeftBody;
  
  padding: 5px 0px 0px 35px;
`

const FooterRight = styled.div`
  label: FooterRight;

  padding: 0px 10px;
  font-weight: 400;
  display: grid;
  grid-template-columns: max-content max-content max-content;
`;

const FooterRightHighlight = styled.div`
  label: FooterRightHighlight;

  font-family: 'Barlow', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
`

const TransparentButton = styled.button`
  label: TransparentButton;
`

const recommendations = [
  {
    image: "",
    title: "",
    subtitle: ""
  },
  {
    image: "",
    title: "",
    subtitle: ""
  },
]

const Recommendation = () => {
  return (
    <Container>
      <Header>
        Here's what we recommend!
      </Header>
      <Recommendations>

      </Recommendations>
      <Footer>
        <FooterLeft>
          <FooterLeftHighlight>
            <QuestionMark size="25px"/>
            <div>Craving something else?</div>
          </FooterLeftHighlight>
          <FooterLeftBody>Here's some crowd favourites to make any event the main event</FooterLeftBody>
        </FooterLeft>
        <FooterRight>
          <div>
            <div>Can't find what you are looking for?</div>
            <FooterRightHighlight>Chat or call a representative</FooterRightHighlight>
          </div>
          <TransparentButton>Call Us</TransparentButton>
          <TransparentButton>Open chat</TransparentButton>
        </FooterRight>
      </Footer>
    </Container>)
}

export default Recommendation;
