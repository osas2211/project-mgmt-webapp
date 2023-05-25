import React from "react"
import { Logo } from "./Logo"
import { UserDropDown } from "./UserDropDown"
import { BellFilled, SwitcherFilled } from "@ant-design/icons"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { Icon } from "@mui/material"

export const Header = () => {
  return (
    <header className="main-header">
      <Logo />
      <ul>
        <li>
          <Icon component={DarkModeIcon} />
        </li>
        <li className="notification-bell">
          <BellFilled />
        </li>
        <UserDropDown />
      </ul>
    </header>
  )
}
