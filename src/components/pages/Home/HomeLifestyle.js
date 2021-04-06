import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { selectMenuDisplay } from '@open-tender/redux'
import { contains } from '@open-tender/js'

import { Container } from '../..'
import MenuItem from '../Menu/MenuItem'
import DownloadApp from './DownloadApp'

const HomeLifestyleView = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 7rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => props.theme.layout.marginMobile} 0 1rem;
  }
`

const HomeLifestyleContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`

const HomeLifestyleHeader = styled('div')`
  margin: 0 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    text-align: center;
    margin: 0 0 2.5rem;
  }

  h2 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  p {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.5rem 0 0;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const HomeLifestyleApp = styled('div')`
  flex: 0 0 49rem;
  margin: 0 0 3.2rem;
  @media (max-width: 1160px) {
    flex: 0 0 40rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    // display: none;
    flex: 0 0 auto;
    max-width: 47rem;
    margin: 3rem auto;
  }
`

const HomeLifestyleMeals = styled('div')`
  flex-grow: 1;
  margin: 0 3rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

const HomeLifestyleMealsItems = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -1.2rem;
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
const HomeLifestyleMealsItem = styled('div')`
  width: 20%;
  padding: 0 1rem 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 25%;
    &:last-of-type {
      display: none;
    }
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 20%;
    &:last-of-type {
      display: block;
    }
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

const homeCategories = ['Bowls', 'Salads', 'Pitas']
const homeTags = ['keto', 'vegan', 'gluten free']

const HomeLifestyle = () => {
  const { categories } = useSelector(selectMenuDisplay)
  const filtered = categories
    .filter((i) => homeCategories.includes(i.name))
    .reduce((arr, i) => [...arr, ...i.items], [])
    .map((i) => ({ ...i, tagsArr: i.tags.split(', ') }))
    // .map((i) => console.log(i.tagsArr) || { ...i })
    .filter((i) => contains(i.tagsArr, homeTags))
    .slice(0, 5)
  console.log(filtered)

  return (
    <HomeLifestyleView>
      <Container>
        <HomeLifestyleContainer>
          <HomeLifestyleMeals>
            <HomeLifestyleHeader>
              <h2>Life Style Meals</h2>
              <p>Love at first bite that fits your life.</p>
            </HomeLifestyleHeader>
            <HomeLifestyleMealsItems>
              {filtered.map((item) => (
                <HomeLifestyleMealsItem key={item.id}>
                  <MenuItem item={item} category={{ appearance: 'small' }} />
                </HomeLifestyleMealsItem>
              ))}
            </HomeLifestyleMealsItems>
          </HomeLifestyleMeals>
          {isBrowser && (
            <HomeLifestyleApp>
              <DownloadApp />
            </HomeLifestyleApp>
          )}
        </HomeLifestyleContainer>
      </Container>
    </HomeLifestyleView>
  )
}

HomeLifestyle.displayName = 'HomeLifestyle'
export default HomeLifestyle
