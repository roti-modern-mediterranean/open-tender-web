import propTypes from 'prop-types'
import styled from '@emotion/styled'

const GroupOf3PeopleView = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.paprika};
  }
`

const GroupOf3People = ({ size = '2.6rem', color = null }) => {
  return (
    <GroupOf3PeopleView size={size} color={color}>
      <svg width="76" height="44" viewBox="0 0 76 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.9656 14.1602C67.0779 12.955 67.815 11.4517 68.0865 9.83431C68.358 8.21688 68.1522 6.55538 67.4944 5.05304C66.8365 3.55071 65.7551 2.27266 64.3823 1.37524C63.0096 0.477813 61.405 -8.55477e-05 59.765 1.14864e-08C58.1249 8.55706e-05 56.5204 0.47815 55.1478 1.37572C53.7751 2.27328 52.6938 3.55144 52.0361 5.05385C51.3784 6.55626 51.1728 8.21778 51.4445 9.83518C51.7162 11.4526 52.4533 12.9558 53.5658 14.1608C52.034 14.3373 50.5551 14.8281 49.2217 15.6025C50.2011 16.0978 51.1194 16.7056 51.9581 17.4136C52.882 17.0724 53.8587 16.8967 54.8435 16.8946H64.6873C66.9243 16.8971 69.0689 17.7869 70.6507 19.3687C72.2325 20.9505 73.1223 23.0951 73.1248 25.3321L73.1265 37.9883H68.906V33.7696C68.906 33.3966 68.7579 33.039 68.4941 32.7752C68.2304 32.5115 67.8727 32.3633 67.4998 32.3633C67.1268 32.3633 66.7691 32.5115 66.5054 32.7752C66.2417 33.039 66.0935 33.3966 66.0935 33.7696V37.9883H56.9529V40.8008H73.1248C73.8704 40.8 74.5854 40.5035 75.1126 39.9762C75.6399 39.4489 75.9365 38.734 75.9373 37.9883V25.3321C75.9332 22.5714 74.9154 19.9084 73.0771 17.8488C71.2388 15.7892 68.7081 14.4766 65.9656 14.1602ZM59.7654 2.83213C60.8779 2.83213 61.9655 3.16203 62.8905 3.78011C63.8155 4.39819 64.5365 5.2767 64.9622 6.30453C65.388 7.33237 65.4994 8.46336 65.2823 9.55451C65.0653 10.6456 64.5295 11.6479 63.7429 12.4346C62.9562 13.2213 61.9539 13.757 60.8628 13.974C59.7716 14.1911 58.6406 14.0797 57.6128 13.6539C56.585 13.2282 55.7065 12.5072 55.0884 11.5822C54.4703 10.6572 54.1404 9.56964 54.1404 8.45712C54.1421 6.96581 54.7353 5.53606 55.7898 4.48154C56.8443 3.42701 58.2741 2.83383 59.7654 2.83213Z" fill="#25272A"/>
        <path d="M11.25 16.8946H21.0937C22.0786 16.8967 23.0553 17.0724 23.9792 17.4136C24.8179 16.7056 25.7362 16.0978 26.7156 15.6025C25.3822 14.8281 23.9033 14.3373 22.3714 14.1608C23.4839 12.9558 24.2211 11.4526 24.4928 9.83519C24.7645 8.21779 24.5589 6.55626 23.9012 5.05386C23.2435 3.55145 22.1622 2.27329 20.7895 1.37572C19.4169 0.478154 17.8124 8.74311e-05 16.1723 1.19913e-08C14.5323 -8.74071e-05 12.9277 0.477807 11.555 1.37523C10.1822 2.27265 9.10078 3.5507 8.44291 5.05303C7.78505 6.55537 7.57929 8.21687 7.8508 9.8343C8.12231 11.4517 8.85931 12.955 9.97167 14.1602C7.2292 14.4766 4.69847 15.7892 2.86016 17.8488C1.02185 19.9084 0.00402058 22.5714 0 25.3321V37.9883C0.000794738 38.734 0.297366 39.4489 0.824639 39.9762C1.35191 40.5035 2.06682 40.8 2.8125 40.8008H18.9844V37.9883H9.84374V33.7696C9.84374 33.3966 9.69558 33.0389 9.43186 32.7752C9.16814 32.5115 8.81045 32.3633 8.43749 32.3633C8.06453 32.3633 7.70685 32.5115 7.44312 32.7752C7.1794 33.0389 7.03124 33.3966 7.03124 33.7696V37.9883H2.8125V25.3321C2.815 23.0951 3.70475 20.9504 5.28654 19.3687C6.86834 17.7869 9.013 16.8971 11.25 16.8946ZM16.1719 2.83212C17.2844 2.83212 18.3719 3.16202 19.2969 3.7801C20.222 4.39819 20.9429 5.27669 21.3687 6.30452C21.7944 7.33236 21.9058 8.46336 21.6888 9.5545C21.4717 10.6456 20.936 11.6479 20.1493 12.4346C19.3627 13.2213 18.3604 13.757 17.2692 13.974C16.1781 14.1911 15.0471 14.0797 14.0193 13.6539C12.9914 13.2282 12.1129 12.5072 11.4948 11.5822C10.8768 10.6572 10.5469 9.56963 10.5469 8.45712C10.5486 6.9658 11.1418 5.53605 12.1963 4.48153C13.2508 3.42701 14.6805 2.83383 16.1719 2.83212Z" fill="#25272A"/>
        <path d="M44.1689 16.9727C45.2813 15.7675 46.0183 14.2643 46.2898 12.6469C46.5613 11.0295 46.3556 9.36806 45.6978 7.86574C45.04 6.36342 43.9586 5.08537 42.5859 4.18791C41.2132 3.29046 39.6088 2.8125 37.9687 2.8125C36.3287 2.8125 34.7242 3.29046 33.3516 4.18791C31.9789 5.08537 30.8975 6.36342 30.2397 7.86574C29.5819 9.36806 29.3762 11.0295 29.6477 12.6469C29.9192 14.2643 30.6562 15.7675 31.7685 16.9727C29.0261 17.2891 26.4953 18.6017 24.657 20.6613C22.8187 22.7209 21.8009 25.3839 21.7969 28.1446V40.8008C21.7977 41.5465 22.0942 42.2614 22.6215 42.7887C23.1488 43.316 23.8637 43.6125 24.6094 43.6133H51.3281C52.0738 43.6125 52.7887 43.316 53.316 42.7887C53.8432 42.2614 54.1398 41.5465 54.1406 40.8008V28.1446C54.1366 25.3839 53.1187 22.7209 51.2804 20.6613C49.4421 18.6017 46.9114 17.2891 44.1689 16.9727ZM37.9687 5.64462C39.0813 5.64462 40.1688 5.97452 41.0938 6.59261C42.0188 7.21069 42.7398 8.08919 43.1656 9.11703C43.5913 10.1449 43.7027 11.2759 43.4856 12.367C43.2686 13.4581 42.7329 14.4604 41.9462 15.2471C41.1595 16.0338 40.1573 16.5695 39.0661 16.7865C37.975 17.0036 36.844 16.8922 35.8161 16.4664C34.7883 16.0407 33.9098 15.3197 33.2917 14.3947C32.6736 13.4697 32.3437 12.3821 32.3437 11.2696C32.3454 9.7783 32.9386 8.34855 33.9931 7.29403C35.0477 6.23951 36.4774 5.64633 37.9687 5.64462ZM51.3298 40.8008H47.1094V36.5821C47.1094 36.2091 46.9612 35.8514 46.6975 35.5877C46.4337 35.324 46.0761 35.1758 45.7031 35.1758C45.3301 35.1758 44.9725 35.324 44.7087 35.5877C44.445 35.8514 44.2969 36.2091 44.2969 36.5821V40.8008H31.6406V36.5821C31.6406 36.2091 31.4925 35.8514 31.2287 35.5877C30.965 35.324 30.6073 35.1758 30.2344 35.1758C29.8614 35.1758 29.5037 35.324 29.24 35.5877C28.9763 35.8514 28.8281 36.2091 28.8281 36.5821V40.8008H24.6094V28.1446C24.6119 25.9076 25.5016 23.763 27.0834 22.1812C28.6652 20.5994 30.8099 19.7096 33.0469 19.7071H42.8906C45.1276 19.7096 47.2723 20.5994 48.8541 22.1812C50.4358 23.763 51.3256 25.9076 51.3281 28.1446L51.3298 40.8008Z" fill="#25272A"/>
      </svg>
    </GroupOf3PeopleView>
  )
}

GroupOf3People.displayName = 'GroupOf3People'
GroupOf3People.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default GroupOf3People
