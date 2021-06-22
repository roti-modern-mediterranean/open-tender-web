import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import QuestionMark from '../../icons/QuestionMark'
import { Preface } from '@open-tender/components'
import CallUsButton from './CallUsButton'
import ChatButton from './ChatButton'
import MenuCateringCategory from '../Menu/MenuCateringCategory'
import { MenuCateringCategories, MenuCateringCategoryItem } from '../Menu/MenuCatering'
import { Loading } from '../../index'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'
import { useHistory } from 'react-router-dom'

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

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 5px 0px 15px;
  }

`;

const CustomPreface = styled(Preface)`
  label: CustomPreface;
  
  color: ${(props) => props.theme.colors.tahini};
  font-weight: 500;
  font-size: 2.2rem;
`

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

const Recommendations = styled(MenuCateringCategories)`
  label: Recommendations;

  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  
  margin: 30px 0px 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0px;
  }
`;

const OrBetween = styled(CustomPreface)`
  label: OrBetween;
  
  display: flex;
  align-items: center;
  padding: 0 0.6rem 3.2rem;
`

const Footer = styled.div`
  label: RecommendationFooter;

  border-top: 1px solid #FFFFFF44;
  padding-top: 20px;
  display: grid;
  grid-template-columns: fit-content(40%) max-content;
  justify-content: center;
  margin-bottom: -10px;
  
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 100%;
    border-top: none;
    padding-top: 0px;
  }
`;

const FooterLeft = styled.button`
  label: FooterLeft;

  border-right: 1px solid #FFFFFF44;
  padding: 0px 10px;
  color: ${(props) => props.theme.colors.tahini};
  text-align: left;
  min-width: 300px;
  min-height: 70px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 100%;
    text-align: left;
    width: auto;
    padding: 1rem;
    border: 1px solid #ffffff50;
    margin: 5px 0px;
  }
`;

const FooterLeftHighlight = styled.div`
  label: FooterLeftHighlight;

  display: grid;
  grid-template-columns: 27px max-content;
  grid-column-gap: 5px;
  align-items: center;
  font-family: 'Barlow', sans-serif;
  font-size: 20px;
  text-transform: uppercase;
`

const FooterLeftBody = styled.div`
  label: FooterLeftBody;
  
  padding: 5px 0px 0px 32px;
`

const FooterRight = styled.div`
  label: FooterRight;

  padding: 0px 10px;
  font-weight: 400;
  display: grid;
  grid-template-columns: max-content max-content max-content;
  gap: 10px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 100%;
    text-align: left;
    width: auto;
    padding: 1rem;
    border: 1px solid #ffffff50;
    margin: 5px 0px;
  }
`;

const FooterRightText = styled.div`
  label: FooterRightText;
  
  display: grid;
  grid-row-gap: 0.5rem;
  align-content: start;
  margin: 0px 10px;
`;

// TODO remove hardcoded recommendation
const recommendations = [
  {
    id: 1045,
    small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1507125530_600x900_vtsm-platter.jpg",
    name: "Tasting Platters",
    items: [
      {
        category_id: 1045,
        id: 18188,
        name: "Mediterranean Tasting Platter",
        small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1598320217_mediterranean-tasting-platter.jpg",
        price: "155.00",
        shorthand: ""
      },
      {
        category_id: 1045,
        id: 18195,
        name: "Vegetarian Tasting Platter",
        small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1598320122_vegetarian-tasting-platter.jpg",
        price: "70.00",
        shorthand: ""
      },
      {
        category_id: 1045,
        id: 18196,
        name: "Hummus 3 Ways",
        small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1598320152_hummus-3-ways.jpg",
        price: "50.00",
        shorthand: ""
      }],
    children: []
  },
  {
    id: 1038,
    small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1508336771_600x900_vtsm-anywaybuffet.jpg",
    name: "Any Way Buffet",
    items: [
      {
        category_id: 1038,
        id: 18116,
        name: "Any Way Buffet",
        small_image_url: "//s3.amazonaws.com/betterboh/u/img/prod/46/1501600578_Catering_Buffet_mobile.png",
        price: "0.00",
        shorthand: ""
      }],
    children: []
  }
]

const Recommendation = () => {

  const { revenueCenter } = useSelector(selectOrder)
  const theme = useTheme()
  const history = useHistory()

  const skipSuggestionsOnCLick = useCallback(()=>{
    if(revenueCenter){
      history.push(`/menu/${revenueCenter.slug}`)
    }
  }, [history, revenueCenter])

  return (
    <Container>
      <Header>
        Here's what we recommend!
      </Header>
        {
          revenueCenter
            ? (
              <Recommendations key={0}>
                {
                  recommendations.map((recommendation, index) => (
                    <>
                      { index !== 0 && <OrBetween>or</OrBetween>}
                      <MenuCateringCategoryItem key={recommendation.id}>
                        <MenuCateringCategory category={recommendation} />
                      </MenuCateringCategoryItem>
                    </>
                  ))
                }
              </Recommendations>)
            : <Recommendations key={1}>
              <Loading text="Loading store..." color={theme.colors.tahini} />
            </Recommendations>
        }

      <Footer>
        <FooterLeft onClick={skipSuggestionsOnCLick}>
          {
            revenueCenter
              ? (
                <>
                  <FooterLeftHighlight>
                    <QuestionMark size="23px"/>
                    <CustomPreface>Craving something else?</CustomPreface>
                  </FooterLeftHighlight>
                  <FooterLeftBody>Here's some crowd favourites to make any event the main event</FooterLeftBody>
                </>)
              : <Loading text="Loading store..." color={theme.colors.tahini} />
          }
        </FooterLeft>
        <FooterRight>
          <FooterRightText>
            <div>Can't find what you are looking for?</div>
            <CustomPreface>Chat or call a representative</CustomPreface>
          </FooterRightText>
          <CallUsButton lightMode={true}/>
          <ChatButton lightMode={true}/>
        </FooterRight>
      </Footer>
    </Container>)
}

export default Recommendation;
