import React from 'react'
import propTypes from 'prop-types'

const PageTitle = ({ title, subtitle, preface, error, link }) => {
  return (
    <div className="content__header slide-up">
      <div className="container">
        {!!preface && <p className="content__preface ot-preface">{preface}</p>}
        <h1 className="content__title ot-title">{title}</h1>
        {!!subtitle && (
          <p className="content__subtitle ot-subtitle">{subtitle}</p>
        )}
        {!!error && (
          <p className="content__subtitle ot-subtitle ot-color-error">
            {error}
          </p>
        )}
        {link && <p className="content__link ot-subtitle">{link}</p>}
      </div>
    </div>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  error: propTypes.oneOfType([propTypes.string, propTypes.element]),
  link: propTypes.element,
}

export default PageTitle
