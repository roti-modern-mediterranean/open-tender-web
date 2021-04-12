import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import BuilderOption from './BuilderOption'

const BuilderGroupView = styled('div')`
  margin: 3rem 0 3rem;
`

const BuilderGroupHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 1.5rem;
`

const BuilderGroupTitle = styled(Preface)`
  flex-grow: 1;
  padding: 0 1rem 0 0;
  font-weight: 500;
  font-size: 2.2rem;
  letter-spacing: 0.01em;
  line-height: 1;
`

const BuilderGroupCount = styled(Preface)`
  flex: 0 0 12.5rem;
  padding: 1.2rem 0.5rem 1.2rem;
  text-align: center;
  line-height: 1;
  font-weight: 500;
  font-size: 2.4rem;
  border-radius: 1.4rem;
  color: ${(props) => props.theme.colors.beet};
  border: 0.1rem solid ${(props) => props.theme.colors.beet};
`

const BuilderGroup = ({
  group,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const remaining = group.min ? group.min - group.quantity : null
  return (
    <BuilderGroupView>
      <BuilderGroupHeader>
        <BuilderGroupTitle as="div">{group.name}</BuilderGroupTitle>
        {remaining !== null && (
          <BuilderGroupCount as="div">
            {remaining === 0
              ? 'All Done!'
              : group.quantity === 0
              ? `Select ${remaining}`
              : `${remaining} more`}
          </BuilderGroupCount>
        )}
      </BuilderGroupHeader>
      {group.options.map((option) => (
        <BuilderOption
          key={`${group.id}-${option.id}`}
          group={group}
          option={option}
          adjust={(quantity) =>
            setOptionQuantity(group.id, option.id, quantity)
          }
          increment={() => incrementOption(group.id, option.id)}
          decrement={() => decrementOption(group.id, option.id)}
        />
      ))}
    </BuilderGroupView>
  )
}

BuilderGroup.displayName = 'BuilderGroup'
BuilderGroup.propTypes = {
  group: propTypes.object,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
  setOptionQuantity: propTypes.func,
}

export default BuilderGroup
