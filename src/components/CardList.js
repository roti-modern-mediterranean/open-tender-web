import styled from '@emotion/styled'

export const CardList = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
  }
`
export const CardListItem = styled('div')`
  width: 33.33333%;
  padding: 0 1.2rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0 0 1.2rem;
    max-width: 40rem;
  }
`

export const CardListSmall = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    overflow-x: scroll;
    flex-wrap: nowrap;
    margin: -2rem -${(props) => props.theme.layout.paddingMobile} 0;
    padding: 2rem 3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
  }
`
export const CardListItemSmall = styled('div')`
  min-width: 16.4rem;
  width: 14.28571%;
  padding: 0 1rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 16.66667%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 20%;
  }
  @media (max-width: 860px) {
    width: 25%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 16rem;
    min-width: 16rem;
    flex: 0 0 16rem;
    padding: 0 2rem 1.2rem 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 15.2rem;
    min-width: 15.2rem;
    flex: 0 0 15.2rem;
    padding: 0 1.2rem 1.2rem 0;
  }
`
