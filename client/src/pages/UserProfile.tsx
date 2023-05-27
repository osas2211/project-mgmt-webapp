import React from "react"
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom"
import { SecurityScanOutlined, EditFilled } from "@ant-design/icons"
import { Tabs } from "antd"
import { EditProfile } from "../components/EditProfile"
import { ChangePassword } from "../components/ChangePassword"

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
      children: <ChangePassword />,
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
