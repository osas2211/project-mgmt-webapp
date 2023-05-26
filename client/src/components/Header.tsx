import React from "react"
import { Logo } from "./Logo"
import { UserDropDown } from "./UserDropDown"
import { BellFilled } from "@ant-design/icons"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { Icon } from "@mui/material"
import { Navigator } from "./Navigator"

export const Header = () => {
  return (
    <div>
      <header className="main-header">
        <Logo />
        <ul>
          <li>
            <Icon component={DarkModeIcon} />
          </li>
          <li className="notification-bell">
            <div className="notification-numbers">12</div>
            <BellFilled />
          </li>
          <UserDropDown />
        </ul>
      </header>
    </div>
  )
}
