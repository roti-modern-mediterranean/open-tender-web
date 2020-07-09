import React from 'react'
import propTypes from 'prop-types'

const PageTitle = ({ title, subtitle, preface, error }) => {
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
      </div>
    </div>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  preface: propTypes.string,
}

export default PageTitle
