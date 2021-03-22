import styled from '@emotion/styled'

const CardButtons = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  max-height: 0;
  overflow: hidden;

  .item-active & {
    opacity: 1;
    max-height: none;
    overflow: visible;
  }
`

export default CardButtons
