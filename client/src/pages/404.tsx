import React from "react"
import _404img from "../assets/404.svg"
import { Logo } from "../components/Logo"
import { Link } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"

function _404() {
  return (
    <div className="_404">
      <nav className="landing_desktop-nav">
        <Logo />
      </nav>
      <div>
        <img src={_404img} alt="404 Svg" />
      </div>
      <Link to="/" className="landing_btn_2">
        <HomeOutlined /> Go Back to Home Page
      </Link>
    </div>
  )
}

export default _404
