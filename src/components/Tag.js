import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const TagView = styled('span')`
  display: inline-block;
  padding: 0.5rem 1rem 0.5rem;
  border-radius: 1.5rem;
  line-height: 0;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors[props.bgColor]};
`

const TagContainer = styled('span')`
  display: flex;
  align-items: center;
  line-height: 0;

  span {
    display: inline-block;
    // padding: 0.1rem 0 0;
  }
`

const TagIcon = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0;
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const TagText = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.light};
  line-height: 1.2;
`

const Tag = ({ text, icon, bgColor = 'secondary' }) => {
  return (
    <TagView bgColor={bgColor}>
      <TagContainer>
        {icon && <TagIcon>{icon}</TagIcon>}
        <TagText>{text}</TagText>
      </TagContainer>
    </TagView>
  )
}

Tag.displayName = 'Tag'
Tag.propTypes = {
  text: propTypes.string,
  icon: propTypes.string,
  bgColor: propTypes.string,
}
export default Tag
