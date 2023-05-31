import React from "react"
import { Logo } from "./Logo"
import { UserDropDown } from "./UserDropDown"
import { BellFilled } from "@ant-design/icons"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { Icon } from "@mui/material"
import { Link } from "react-router-dom"

export const Header: React.FC<{ name: string; id: string }> = ({
  name,
  id,
}) => {
  return (
    <div>
      <header className="main-header">
        <Link to="/main/dashboard" style={{ color: "inherit" }}>
          <Logo />
        </Link>
        <ul>
          {/* <li>
            <Icon component={DarkModeIcon} />
          </li> */}
          <li className="notification-bell">
            <div className="notification-numbers">12</div>
            <BellFilled />
          </li>
          <UserDropDown name={name} id={id} />
        </ul>
      </header>
    </div>
  )
}
