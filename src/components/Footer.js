import styled from '@emotion/styled'
import React from 'react'
import { Facebook, Instagram, Twitter } from 'react-feather'
import { Link, useHistory } from 'react-router-dom'
import { ButtonStyled, Preface } from '@open-tender/components'

import packageJson from '../../package.json'
import apple from '../assets/download-app-store.png'
import google from '../assets/download-google-play.png'
import { Container } from '.'

const FooterView = styled('footer')`
  position: relative;
  z-index: 1;
  width: 100%;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.dark};
`

const FooterContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5.5rem 0 8.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
    padding: 5.5rem 0 5.5rem;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      flex-direction: column;
      justify-content: flex-start;
    }

    &:first-of-type {
      margin: 0 0 5rem;
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        margin: 0 0 3rem;
      }
    }

    &:last-of-type {
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        flex-direction: column-reverse;
      }
    }
  }
`

const FooterNav = styled('nav')`
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 1.5rem;
  }

  ul li {
    display: inline-block;
    margin: 0 5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      margin: 0 3.5rem 0 0;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0 1.5rem 1.5rem;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const FooterSocial = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  span {
    display: block;

    &:first-of-type {
      color: ${(props) => props.theme.colors.light};
      font-weight: 500;
      font-size: 1.7rem;
      letter-spacing: 0.01em;
      line-height: 1;
    }

    & + span {
      line-height: 0;
      width: 1.6rem;
      height: 1.6rem;
      color: ${(props) => props.theme.colors.light};
      margin: 0 0 0 1.75rem;
    }
  }
`

const FooterCopyright = styled('div')`
  p {
    margin: 0 0 1.5rem;

    span {
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        display: inline-block;
        margin: 0 0 1rem;
      }
    }
  }
`

const FooterButtons = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    margin: 0 0 2.5rem;
  }
`

const FooterButtonsAppStores = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 1.2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.2rem 0 0;
  }

  a {
    display: block;
    width: 12.1rem;
    line-height: 0;
    margin: 0.2rem 0 0 0;
  }

  a + a {
    margin-left: 1.2rem;
  }
`

const FooterVersion = styled('div')`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 1.5rem;
  color: ${(props) => props.theme.colors.light};
  opacity: 0.3;
  font-size: 0.8rem;
  text-align: right;
`

const Footer = ({ hasRouter = true }) => {
  const history = useHistory()

  return hasRouter ? (
    <FooterView role="contentinfo">
      <Container>
        <FooterContainer>
          <div>
            <FooterNav aria-label="Legal Policies Navigation">
              <ul>
                <li>
                  <Link to="/careers">Careers</Link>
                </li>
                {/* <li>
                  <Link to="/about">About</Link>
                </li> */}
                <li>
                  <Link to="/contact">Contact & Help</Link>
                </li>
                <li>
                  <Link to="/covid-19">Our response to COVID-19</Link>
                </li>
                <li>
                  <Link to="/gift-cards">Gift Cards</Link>
                </li>
              </ul>
            </FooterNav>
            <FooterSocial>
              <Preface>Follow Us</Preface>
              <span>
                <Facebook size={null} />
              </span>
              <span>
                <Instagram size={null} />
              </span>
              <span>
                <Twitter size={null} />
              </span>
            </FooterSocial>
          </div>
          <div>
            <FooterCopyright>
              <p>
                <span>Copyright © 2020 Roti Modern Mediterranean.</span>
                <span>All rights reserved.</span>
              </p>
              <FooterNav aria-label="Legal Policies Navigation">
                <ul>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-conditions">Terms &amp; Conditions</Link>
                  </li>
                  <li>
                    <Link to="/accessibility">Accessibility</Link>
                  </li>
                  <li>
                    <Link to="/refunds">Refunds</Link>
                  </li>
                </ul>
              </FooterNav>
            </FooterCopyright>
            <FooterButtons>
              <FooterButtonsAppStores>
                <a
                  href="https://apps.apple.com/us/app/roti/id583939838"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={apple}
                    alt="Download Roti App from Apple App Store"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ak.app.roti.activity&hl=en_US&gl=US"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    src={google}
                    alt="Download Roti App from Google Pay App Store"
                  />
                </a>
              </FooterButtonsAppStores>
              <ButtonStyled onClick={() => history.push('/locations')}>
                Locate a Roti
              </ButtonStyled>
            </FooterButtons>
          </div>
        </FooterContainer>
      </Container>
      <FooterVersion aria-hidden="true">
        <Container>v{packageJson.version}</Container>
      </FooterVersion>
    </FooterView>
  ) : null
}

Footer.displayName = 'Footer'

export default Footer
