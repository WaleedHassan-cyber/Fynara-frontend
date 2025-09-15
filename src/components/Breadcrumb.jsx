import React from 'react'
import "./Breadcrumb.css"
import { Link } from 'react-router-dom'
const Breadcrumb = ({crumb}) => {
  return (
    <>
    <div className="breadcrumb">
        <Link to="/" className="home-link">
          <svg
            className="home-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 2L2 9h2v9h5V13h2v5h5V9h2L10 2z" />
          </svg>
          Home
        </Link>
        <span className="separator">&gt;</span>
        <span className="current">{crumb}</span>
      </div>
    </>
  )
}

export default Breadcrumb