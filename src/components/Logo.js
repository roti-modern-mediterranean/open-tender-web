import styled from '@emotion/styled'

const LogoView = styled('span')`
  display: block;
  width: 6rem;

  svg {
    width: 100%;
    fill: ${(props) => props.theme.links.primary.color};
  }
`

const Logo = () => {
  return (
    <LogoView>
      <svg viewBox="0 0 160 80">
        <g fillRule="evenodd">
          <path d="M17.09 22.826v9.802h.24c3.598-8.272 10.527-12.05 18.919-12.59.71-.045 1.144-.187 1.707.382.56.566.455 1.341.455 1.341V27.3s.157 1.445-.559 1.858c-.961.554-1.118.489-1.937.542-9.945.673-18.23 4.759-18.23 20.628v17.572s-.022.762.373 1.164c.399.4 1.332.417 1.332.417h4.962s.87.046 1.358.407c.486.363.518 1.368.518 1.368v4.205s.122 1.342-.314 1.782c-.434.438-1.869.36-1.869.36H1.785S.75 77.664.38 77.292C.009 76.92.013 76.03.013 76.03v-5.136s.097-.71.418-1.032c.319-.32 1.201-.381 1.201-.381h4.223s.998-.081 1.33-.417c.332-.334.309-1.264.309-1.264V30.903s.01-.58-.26-.85c-.386-.395-.945-.337-.945-.337H1.464s-.828.068-1.127-.233c-.435-.438-.324-1.271-.324-1.271v-5.249s-.091-.725.314-1.133c.317-.32 1.37-.233 1.37-.233h14.116s.66-.113.998.227c.337.342.28 1.002.28 1.002M118.859 19.944h6.413s.833-.167 1.465.474c.563.566.43 1.376.43 1.376v6.022s.101 1.046-.326 1.476c-.499.501-1.605.425-1.605.425h-6.413s-1.16-.102-1.67.401c-.512.503-.41 1.482-.41 1.482v29.758c0 7.76 1.067 8.243 5.21 8.243.947 0 1.93-.078 2.91-.168.738-.07 1.016-.127 1.585.376.615.542.6 1.316.6 1.316v4.333s.04 1.047-.471 1.629c-.383.438-.861.886-1.532 1.031-2.221.483-4.49.697-6.764.697-9.472 0-11.723-2.665-11.723-14.668v-32.65s.054-.83-.358-1.276c-.523-.571-1.397-.504-1.397-.504h-5.425s-1.015.17-1.705-.529c-.529-.533-.473-1.75-.473-1.75V21.83s-.008-.687.61-1.31c.614-.622 1.604-.576 1.604-.576h5.353s.983.121 1.442-.343c.438-.439.35-1.454.35-1.454V4.007s-.149-.746.463-1.363 1.498-.442 1.498-.442h5.87s1.235-.159 1.971.394c.547.42.382 1.755.382 1.755v13.765s-.134 1.007.393 1.537c.524.528 1.723.291 1.723.291M157.168 77.602h-21.315s-1.002.081-1.602-.522c-.635-.644-.628-1.469-.628-1.469v-4.328s-.14-.585.518-1.247c.658-.66 1.64-.557 1.64-.557h3.853s1.11.022 1.598-.469c.552-.552.467-1.8.467-1.8V31.443s.09-.668-.552-1.314c-.64-.645-1.551-.412-1.551-.412h-3.305s-.983-.047-1.701-.736c-.703-.67-.612-1.721-.612-1.721v-5.32s-.072-.804.612-1.49c.681-.694 2.025-.504 2.025-.504h12.95s1.161-.015 1.793.616c.627.634.53 1.417.53 1.417V67.14s-.053 1.184.623 1.87c.683.684 2.002.468 2.002.468h2.364s1.316-.058 1.963.591c.65.656.53 1.358.53 1.358v3.707s.13 1.131-.564 1.835c-.699.701-1.638.632-1.638.632M88.782 6.788v4.802s.15 1.737-.407 2.298c-.56.561-2.036.377-2.036.377H47.44s-1.167.154-1.9-.584c-.73-.738-.561-1.778-.561-1.778V6.567s-.134-.801.616-1.554c.747-.758 2.023-.62 2.023-.62h38.239s1.454-.248 2.26.566c.806.814.665 1.83.665 1.83M140.451 6.08c0-3.733 2.662-6.08 6.085-6.08 3.426 0 6.087 2.347 6.087 6.08 0 3.882-2.416 6.075-6.087 6.075-3.67 0-6.085-2.193-6.085-6.076M48.465 50.9c0 12.306 7.47 20.67 18.794 20.67 11.32 0 18.791-8.364 18.791-20.67 0-12.304-7.47-20.666-18.79-20.666-11.325 0-18.795 8.362-18.795 20.666m-10.04 0c0-17.677 12.607-28.788 28.834-28.788 16.226 0 28.832 11.11 28.832 28.788 0 18.4-11.441 28.794-28.832 28.794-17.395 0-28.834-10.395-28.834-28.794M155.455 21.777c-.936 0-1.64.697-1.64 1.598 0 .912.704 1.603 1.64 1.603.93 0 1.64-.69 1.64-1.603 0-.9-.71-1.598-1.64-1.598m0 2.998c-.817 0-1.414-.603-1.414-1.4 0-.793.597-1.395 1.414-1.395.81 0 1.414.602 1.414 1.395 0 .797-.604 1.4-1.414 1.4m.723-1.775c0-.399-.27-.589-.673-.589h-.716v1.939h.308v-.76h.471l.365.76h.332l-.401-.83c.195-.082.314-.254.314-.52m-1.08.336v-.678h.389c.22 0 .377.101.377.342 0 .241-.157.336-.377.336h-.39" />
        </g>
      </svg>
    </LogoView>
  )
}

export default Logo