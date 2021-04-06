import Cilantro from './Cilantro'
import Dairy from './Dairy'
import Eggs from './Eggs'
import Garlic from './Garlic'
import Gluten from './Gluten'
import Honey from './Honey'
import Meat from './Meat'
import Nuts from './Nuts'
import Sesame from './Sesame'
import Shellfish from './Shellfish'
import SoybeanOil from './SoybeanOil'
import SoyProtein from './SoyProtein'
import Wheat from './Wheat'

export {
  Cilantro,
  Dairy,
  Eggs,
  Garlic,
  Gluten,
  Honey,
  Meat,
  Nuts,
  Sesame,
  Shellfish,
  SoybeanOil,
  SoyProtein,
  Wheat,
}

export const allergenIconMap = {
  'cilantro / coriander': (props) => <Cilantro {...props} />,
  dairy: (props) => <Dairy {...props} />,
  eggs: (props) => <Eggs {...props} />,
  'fish / shellfish': (props) => <Shellfish {...props} />,
  garlic: (props) => <Garlic {...props} />,
  gluten: (props) => <Gluten {...props} />,
  honey: (props) => <Honey {...props} />,
  meat: (props) => <Meat {...props} />,
  nuts: (props) => <Nuts {...props} />,
  sesame: (props) => <Sesame {...props} />,
  'soy protein': (props) => <SoyProtein {...props} />,
  'soybean oil': (props) => <SoybeanOil {...props} />,
  wheat: (props) => <Wheat {...props} />,
}
