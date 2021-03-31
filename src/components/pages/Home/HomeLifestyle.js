import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectMenuDisplay } from '@open-tender/redux'
import { contains } from '@open-tender/js'

import { CardListItemSmall, CardListSmall, Container } from '../..'
import MenuItem from '../Menu/MenuItem'

const HomeLifestyleView = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 7rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const HomeLifestyleHeader = styled('div')`
  margin: 0 0 5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    display: none;
  }

  h2 {
    line-height: 1;
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
    .slice(0, 6)
  console.log(filtered)

  return (
    <HomeLifestyleView>
      <Container>
        <HomeLifestyleHeader>
          <h2>Life Style Meals</h2>
          <p>Love at first bite that fits your life.</p>
        </HomeLifestyleHeader>
        <CardListSmall>
          {filtered.map((item) => (
            <CardListItemSmall key={item.id}>
              <MenuItem item={item} category={{ appearance: 'small' }} />
            </CardListItemSmall>
          ))}
        </CardListSmall>
      </Container>
    </HomeLifestyleView>
  )
}

HomeLifestyle.displayName = 'HomeLifestyle'
export default HomeLifestyle
