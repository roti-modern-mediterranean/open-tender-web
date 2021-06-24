import propTypes from 'prop-types'
import styled from '@emotion/styled'

const People3View = styled('span')`
  display: block;
  width: ${(props) => props.size};
  line-height: 0;

  svg {
    width: 100%;
    fill: ${(props) => props.color || props.theme.colors.light};
  }
`

const People3 = ({ size = '3.6rem', color = null }) => {
  return (
    <People3View size={size} color={color}>
      <svg viewBox="0 0 76 45" fill="none">
        <path d="M65.9657 14.6602C67.0781 13.455 67.8151 11.9517 68.0866 10.3343C68.3581 8.71688 68.1523 7.05538 67.4945 5.55304C66.8366 4.05071 65.7552 2.77266 64.3824 1.87524C63.0097 0.977813 61.4051 0.499914 59.7651 0.5C58.125 0.500086 56.5205 0.97815 55.1479 1.87572C53.7752 2.77328 52.6939 4.05144 52.0362 5.55385C51.3785 7.05626 51.1729 8.71778 51.4446 10.3352C51.7163 11.9526 52.4535 13.4558 53.5659 14.6608C52.0341 14.8373 50.5552 15.3281 49.2218 16.1025C50.2012 16.5978 51.1196 17.2056 51.9582 17.9136C52.8821 17.5724 53.8588 17.3967 54.8437 17.3946H64.6874C66.9244 17.3971 69.069 18.2869 70.6508 19.8687C72.2326 21.4505 73.1224 23.5951 73.1249 25.8321L73.1266 38.4883H68.9061V34.2696C68.9061 33.8966 68.758 33.539 68.4943 33.2752C68.2305 33.0115 67.8729 32.8633 67.4999 32.8633C67.1269 32.8633 66.7692 33.0115 66.5055 33.2752C66.2418 33.539 66.0936 33.8966 66.0936 34.2696V38.4883H56.953V41.3008H73.1249C73.8706 41.3 74.5855 41.0035 75.1127 40.4762C75.64 39.9489 75.9366 39.234 75.9374 38.4883V25.8321C75.9334 23.0714 74.9155 20.4084 73.0772 18.3488C71.2389 16.2892 68.7082 14.9766 65.9657 14.6602ZM59.7655 3.33213C60.878 3.33213 61.9656 3.66203 62.8906 4.28011C63.8156 4.89819 64.5366 5.7767 64.9623 6.80453C65.3881 7.83237 65.4995 8.96336 65.2824 10.0545C65.0654 11.1456 64.5297 12.1479 63.743 12.9346C62.9563 13.7213 61.9541 14.257 60.8629 14.474C59.7718 14.6911 58.6408 14.5797 57.6129 14.1539C56.5851 13.7282 55.7066 13.0072 55.0885 12.0822C54.4704 11.1572 54.1405 10.0696 54.1405 8.95712C54.1422 7.46581 54.7354 6.03606 55.7899 4.98154C56.8445 3.92701 58.2742 3.33383 59.7655 3.33213Z" />
        <path d="M11.25 17.3946H21.0937C22.0786 17.3967 23.0553 17.5724 23.9792 17.9136C24.8179 17.2056 25.7362 16.5978 26.7156 16.1025C25.3822 15.3281 23.9033 14.8373 22.3714 14.6608C23.4839 13.4558 24.2211 11.9526 24.4928 10.3352C24.7645 8.71779 24.5589 7.05626 23.9012 5.55386C23.2435 4.05145 22.1622 2.77329 20.7895 1.87572C19.4169 0.978154 17.8124 0.500087 16.1723 0.5C14.5323 0.499913 12.9277 0.977807 11.555 1.87523C10.1822 2.77265 9.10078 4.0507 8.44291 5.55303C7.78505 7.05537 7.57929 8.71687 7.8508 10.3343C8.12231 11.9517 8.85931 13.455 9.97167 14.6602C7.2292 14.9766 4.69847 16.2892 2.86016 18.3488C1.02185 20.4084 0.00402058 23.0714 0 25.8321V38.4883C0.000794738 39.234 0.297366 39.9489 0.824639 40.4762C1.35191 41.0035 2.06682 41.3 2.8125 41.3008H18.9844V38.4883H9.84374V34.2696C9.84374 33.8966 9.69558 33.5389 9.43186 33.2752C9.16814 33.0115 8.81045 32.8633 8.43749 32.8633C8.06453 32.8633 7.70685 33.0115 7.44312 33.2752C7.1794 33.5389 7.03124 33.8966 7.03124 34.2696V38.4883H2.8125V25.8321C2.815 23.5951 3.70475 21.4504 5.28654 19.8687C6.86834 18.2869 9.013 17.3971 11.25 17.3946ZM16.1719 3.33212C17.2844 3.33212 18.3719 3.66202 19.2969 4.2801C20.222 4.89819 20.9429 5.77669 21.3687 6.80452C21.7944 7.83236 21.9058 8.96336 21.6888 10.0545C21.4717 11.1456 20.936 12.1479 20.1493 12.9346C19.3627 13.7213 18.3604 14.257 17.2692 14.474C16.1781 14.6911 15.0471 14.5797 14.0193 14.1539C12.9914 13.7282 12.1129 13.0072 11.4948 12.0822C10.8768 11.1572 10.5469 10.0696 10.5469 8.95712C10.5486 7.4658 11.1418 6.03605 12.1963 4.98153C13.2508 3.92701 14.6805 3.33383 16.1719 3.33212Z" />
        <path d="M44.1689 17.4727C45.2812 16.2675 46.0182 14.7643 46.2898 13.1469C46.5613 11.5295 46.3556 9.86806 45.6977 8.36574C45.0399 6.86342 43.9586 5.58537 42.5859 4.68791C41.2132 3.79046 39.6087 3.3125 37.9687 3.3125C36.3287 3.3125 34.7242 3.79046 33.3515 4.68791C31.9788 5.58537 30.8975 6.86342 30.2397 8.36574C29.5819 9.86806 29.3761 11.5295 29.6476 13.1469C29.9192 14.7643 30.6562 16.2675 31.7685 17.4727C29.026 17.7891 26.4953 19.1017 24.657 21.1613C22.8187 23.2209 21.8009 25.8839 21.7968 28.6446V41.3008C21.7976 42.0465 22.0942 42.7614 22.6215 43.2887C23.1488 43.816 23.8637 44.1125 24.6093 44.1133H51.3281C52.0737 44.1125 52.7887 43.816 53.3159 43.2887C53.8432 42.7614 54.1398 42.0465 54.1406 41.3008V28.6446C54.1365 25.8839 53.1187 23.2209 51.2804 21.1613C49.4421 19.1017 46.9114 17.7891 44.1689 17.4727ZM37.9687 6.14462C39.0812 6.14462 40.1688 6.47452 41.0938 7.09261C42.0188 7.71069 42.7398 8.58919 43.1655 9.61703C43.5913 10.6449 43.7027 11.7759 43.4856 12.867C43.2686 13.9581 42.7328 14.9604 41.9462 15.7471C41.1595 16.5338 40.1572 17.0695 39.0661 17.2865C37.9749 17.5036 36.8439 17.3922 35.8161 16.9664C34.7883 16.5407 33.9098 15.8197 33.2917 14.8947C32.6736 13.9697 32.3437 12.8821 32.3437 11.7696C32.3454 10.2783 32.9386 8.84855 33.9931 7.79403C35.0476 6.73951 36.4774 6.14633 37.9687 6.14462ZM51.3298 41.3008H47.1093V37.0821C47.1093 36.7091 46.9612 36.3514 46.6974 36.0877C46.4337 35.824 46.076 35.6758 45.7031 35.6758C45.3301 35.6758 44.9724 35.824 44.7087 36.0877C44.445 36.3514 44.2968 36.7091 44.2968 37.0821V41.3008H31.6406V37.0821C31.6406 36.7091 31.4924 36.3514 31.2287 36.0877C30.965 35.824 30.6073 35.6758 30.2343 35.6758C29.8614 35.6758 29.5037 35.824 29.24 36.0877C28.9762 36.3514 28.8281 36.7091 28.8281 37.0821V41.3008H24.6093V28.6446C24.6118 26.4076 25.5016 24.263 27.0834 22.6812C28.6652 21.0994 30.8098 20.2096 33.0468 20.2071H42.8906C45.1276 20.2096 47.2722 21.0994 48.854 22.6812C50.4358 24.263 51.3256 26.4076 51.3281 28.6446L51.3298 41.3008Z" />
      </svg>
    </People3View>
  )
}

People3.displayName = 'People3'
People3.propTypes = {
  size: propTypes.string,
  color: propTypes.string,
}

export default People3
