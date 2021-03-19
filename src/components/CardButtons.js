import styled from '@emotion/styled'

const CardButtons = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  max-height: 0;

  .item-active & {
    opacity: 1;
    max-height: none;
  }
`

export default CardButtons
