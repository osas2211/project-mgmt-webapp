import React from "react"
import userImg from "../assets/user.jpg"
import { CaretDownFilled, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Dropdown } from "antd"
import { Typography } from "antd"

const { Text } = Typography

export const UserDropDown = () => {
  const items = [
    {
      key: 1,
      label: (
        <div>
          <UserOutlined style={{ fontSize: "1rem", paddingRight: "0.5rem" }} />
          <Link to={"profile"}>
            <Text>My Account</Text>
          </Link>
        </div>
      ),
    },
  ]
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="user-dropdown">
        <img src={userImg} alt="user" />
        <div style={{ marginLeft: "0.5rem" }}>
          <h4>
            Osaretin Frank <CaretDownFilled style={{ fontSize: "0.8rem" }} />
          </h4>
          <p>
            <small>@osaretinfrank</small>
          </p>
        </div>
      </div>
    </Dropdown>
  )
}
