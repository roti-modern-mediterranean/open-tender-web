import styled from '@emotion/styled'

import apple from '../../../assets/download-app-store.png'
import google from '../../../assets/download-google-play.png'

const DownloadAppView = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4.5rem 3rem 3rem;
  border-radius: ${(props) => props.theme.border.radius};
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0.5%,
      rgba(0, 0, 0, 0.042) 49.48%,
      rgba(0, 0, 0, 0) 99.5%
    ),
    ${(props) => props.theme.bgColors.secondary};
  // background-color: ${(props) => props.theme.bgColors.secondary};
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    padding: 2rem 3rem 3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    max-width: 35rem;
    margin: 0 auto;
    padding: 2rem;
  }
`

const DownloadAppeHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    line-height: 1;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: 4.4rem;
    }
  }

  p {
    line-height: 1;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      margin: 0.5rem 0 0;
      font-size: 1.7rem;
    }
  }
`

const DownloadAppButtons = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: block;
    width: 50%;
    line-height: 0;
  }

  a + a {
    margin-left: 1.5rem;
  }
`

const DownloadApp = () => {
  return (
    <DownloadAppView>
      <DownloadAppeHeader>
        <h2>Prefer Mobile Ordering?</h2>
        <p>Download Our App</p>
      </DownloadAppeHeader>
      <DownloadAppButtons>
        <a
          href="https://apps.apple.com/us/app/roti/id583939838"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={apple} alt="Download Roti App from Apple App Store" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.ak.app.roti.activity&hl=en_US&gl=US"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={google} alt="Download Roti App from Google Pay App Store" />
        </a>
      </DownloadAppButtons>
    </DownloadAppView>
  )
}

export default DownloadApp
