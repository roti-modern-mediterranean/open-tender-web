import styled from '@emotion/styled'
import propTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import { slugify } from '@open-tender/js'

import MenuItem from '../Menu/MenuItem'
// import { MoreLink } from '../..'

const HomeMenuCategoryView = styled('div')`
  width: 33.33333%;
  padding: 0 1.2rem;
  background-color: ${(props) =>
    props.theme.bgColors[props.isInverted ? 'secondary' : 'primary']};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 100%;
    padding: 3.5rem ${(props) => props.theme.layout.paddingMobile};
  }

  & > div {
    max-width: 46.2rem;
    margin: 0 auto;
  }
`

const HomeMenuCategoryHeader = styled('div')`
  margin: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    text-align: center;
  }

  h3 {
    line-height: 1;
  }

  p {
    margin: 0.75rem 0 0;
  }
`

const HomeMenuCategoryItem = styled('div')`
  margin: 1.5rem 0 0;
`

// const HomeMenuCategoryFooter = styled('div')`
//   margin: 1.5rem 0 0;
//   display: flex;
//   justify-content: flex-end;
//   @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
//     margin: 0rem 0 0;
//   }
// `

const HomeMenuCategory = ({ category, isInverted = false }) => {
  // const history = useHistory()
  const items = category.items.slice(0, 3)
  // const isMore = category.items.length > items.length

  return (
    <HomeMenuCategoryView id={slugify(category.name)} isInverted={isInverted}>
      <div>
        <HomeMenuCategoryHeader>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </HomeMenuCategoryHeader>
        <div>
          {items.map((item) => (
            <HomeMenuCategoryItem key={item.id}>
              <MenuItem item={item} isInverted={isInverted} />
            </HomeMenuCategoryItem>
          ))}
        </div>
        {/* {isMore && (
          <HomeMenuCategoryFooter>
            <MoreLink
              onClick={() => history.push('/menu')}
              text={`View all ${category.name}`}
            />
          </HomeMenuCategoryFooter>
        )} */}
      </div>
    </HomeMenuCategoryView>
  )
}

HomeMenuCategory.displayName = 'HomeMenuCategory'
HomeMenuCategory.propTypes = {
  category: propTypes.object,
  isInverted: propTypes.bool,
}

export default HomeMenuCategory
