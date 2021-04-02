import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ErrMsg } from '.'

const LabelView = styled('label')`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 2rem;
  font-family: ${(props) => props.theme.inputs.family};
  font-size: ${(props) => props.theme.inputs.fontSize};
  // border-bottom: ${(props) => props.theme.inputs.borderWidth} solid
  //   ${(props) => props.theme.inputs.borderColor};

  input,
  textarea,
  select {
    // display: block;
    // border: 0;
    font-size: inherit;
    padding-left: 3.4rem;

    &::placeholder {
      opacity: 0;
    }

    &:focus {
      outline: none;

      &::placeholder {
        opacity: 1;
      }
    }
  }
`

const LabelIcon = styled('span')`
  position: absolute;
  top: 0;
  left: 0;
  width: 3rem;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${(props) =>
      props.hasValue
        ? props.theme.inputs.color
        : props.theme.inputs.placeholderColor};
  }
`

const LabelText = styled('span')`
  position: absolute;
  top: 0;
  left: 3.4rem;
  width: 90%;
  font-size: inherit;
  color: ${(props) => props.theme.inputs.borderColor};
  padding: ${(props) => props.theme.inputs.padding};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  transition: all 0.1s cubic-bezier(0.17, 0.67, 0.12, 1);

  input:focus + &,
  textarea:focus + &,
  select:focus + & {
    transform: translate(-3.4rem, -2.5rem);
    font-weight: 300;
    font-size: 1.8rem;
    cursor: default;
  }

  ${(props) =>
    props.hasValue
      ? `    transform: translate(-3.4rem, -2.5rem);
    font-weight: 300;
    font-size: 1.8rem;
    cursor: default;`
      : ''}
`

const LabelRequired = styled('span')`
  color: ${(props) => props.theme.colors.error};
`

const Label = ({ icon, text, required, value, errMsg, children }) => (
  <LabelView>
    {icon && <LabelIcon hasValue={!!value}>{icon}</LabelIcon>}
    {children}
    <LabelText hasValue={!!value}>
      {text}
      {required ? <LabelRequired>&nbsp;*</LabelRequired> : null}
    </LabelText>
    <ErrMsg errMsg={errMsg} />
  </LabelView>
)

Label.displayName = 'Label'
Label.propTypes = {
  icon: propTypes.element,
  text: propTypes.oneOfType([propTypes.string, propTypes.element]),
  required: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Label
