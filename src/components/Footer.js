import styled from '@emotion/styled'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ButtonStyled, Preface } from '@open-tender/components'

import { Container } from '.'
import packageJson from '../../package.json'
import { Facebook, Instagram, Twitter } from 'react-feather'

const FooterView = styled('footer')`
  position: relative;
  z-index: 1;
  width: 100%;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.dark};
`

const FooterContainer = styled('div')`
  // height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5.5rem 0 8.5rem;
  // @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
  //   height: 24rem;
  //   padding: 0 0 6rem;
  // }

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:first-of-type {
      margin: 0 0 5rem;
    }
  }
`

const FooterNav = styled('nav')`
  margin: 0;
  // font-size: ${(props) => props.theme.fonts.sizes.small};

  ul li {
    float: left;
    margin: 0 5rem 0 0;

    &:last-child {
      margin-right: 0;
    }

    // a {
    //   color: ${(props) => props.theme.links.light.color};
    // }

    // a:hover,
    // a:active,
    // a:focus {
    //   color: ${(props) => props.theme.links.light.hover};
    // }
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
  }
`

const FooterButtons = styled('div')``

const FooterVersion = styled('div')`
  position: absolute;
  z-index: 2;
  left: ${(props) => props.theme.layout.padding};
  bottom: 1.5rem;
  color: ${(props) => props.theme.colors.light};
  opacity: 0.3;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
  }
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
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact & Help</Link>
                </li>
                <li>
                  <Link to="/menu">Menu</Link>
                </li>
                <li>
                  <Link to="/menu">Nutrition & Allergen Info</Link>
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
                Copyright © 2020 Roti Modern Mediterranean. All rights reserved.
              </p>
              <FooterNav aria-label="Legal Policies Navigation">
                <ul>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & Conditions</Link>
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
              <ButtonStyled onClick={() => history.push('/locations')}>
                Locate a Roti
              </ButtonStyled>
            </FooterButtons>
          </div>
        </FooterContainer>
        {/* <FooterVersion aria-hidden="true">v{packageJson.version}</FooterVersion> */}
      </Container>
    </FooterView>
  ) : null
}

Footer.displayName = 'Footer'

export default Footer
