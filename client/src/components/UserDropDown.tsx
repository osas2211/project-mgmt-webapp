import React, { ReactNode } from "react"
import userImg from "../assets/user.png"
import { CaretDownFilled, UserOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { Dropdown } from "antd"
import { Typography } from "antd"
import { Logout } from "./Logout"
import { useGetUserSessionQuery } from "../redux/services/projectify"

const { Text } = Typography

export const UserDropDown: React.FC<{ name: string; id: string }> = ({
  name,
  id,
}) => {
  const { data } = useGetUserSessionQuery("")
  type item = {
    key: number
    label: ReactNode
  }
  const items: item[] = [
    {
      key: 1,
      label: (
        <>
          <Link to={"/main/profile"}>
            <UserOutlined
              style={{ fontSize: "1rem", paddingRight: "0.5rem" }}
            />
            <Text>My Account</Text>
          </Link>
        </>
      ),
    },
    {
      key: 2,
      label: <Logout />,
    },
  ]
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div className="user-dropdown">
        <img src={data?.prefs.profile_picture} alt="user" />
        <div style={{ marginLeft: "0.5rem" }}>
          <h4>
            {name} <CaretDownFilled style={{ fontSize: "0.8rem" }} />
          </h4>
          <p>
            <small>@{id}</small>
          </p>
        </div>
      </div>
    </Dropdown>
  )
}
