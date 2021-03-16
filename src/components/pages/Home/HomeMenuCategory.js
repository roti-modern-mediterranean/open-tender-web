import styled from '@emotion/styled'
import MenuItem from '../Menu/MenuItem'

const HomeMenuCategoryView = styled('div')`
  width: 33.33333%;
  padding: 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
    padding: 0.5rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    padding: 0.5rem;
  }
`

const HomeMenuCategoryHeader = styled('div')`
  margin: 0;
`

const HomeMenuCategoryItem = styled('div')`
  margin: 1.5rem 0 0;
`

const HomeMenuCategory = ({ category }) => {
  const items = category.items.slice(0, 4)
  const isMore = category.items.length > items.length

  return (
    <HomeMenuCategoryView>
      <HomeMenuCategoryHeader>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </HomeMenuCategoryHeader>
      <div>
        {items.map((item) => (
          <HomeMenuCategoryItem>
            <MenuItem key={item.id} item={item} isInverted={false} />
          </HomeMenuCategoryItem>
        ))}
      </div>
    </HomeMenuCategoryView>
  )
}

HomeMenuCategory.displayName = 'HomeMenuCategory'
export default HomeMenuCategory
