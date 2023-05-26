import React from "react"
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"
import {
  AndroidOutlined,
  SecurityScanOutlined,
  EditFilled,
} from "@ant-design/icons"
import { Password } from "@mui/icons-material"
import { Tabs } from "antd"
import { EditProfile } from "../components/EditProfile"

export const UserProfile = () => {
  const tabItems = [
    {
      label: (
        <span>
          <EditFilled />
          Edit Profile
        </span>
      ),
      key: "1",
      children: <EditProfile />,
    },
    {
      label: (
        <span>
          <SecurityScanOutlined />
          Change Password
        </span>
      ),
      key: "2",
      children: <p>Tab 2</p>,
    },
  ]
  return (
    <div className="profile">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Account</h2>
        <Breadcrumb
          items={[
            {
              title: <Link to={"/main/dashboard"}>Home</Link>,
            },
            {
              title: "Profile",
            },
          ]}
        />
      </div>

      <div className="profile-main">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </div>
  )
}
