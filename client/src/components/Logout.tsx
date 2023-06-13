import React from "react"
import { LogoutOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Account, Client } from "appwrite"

const { Text } = Typography

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)
const account = new Account(client)

export const Logout = () => {
  return (
    <div
      onClick={async () => {
        try {
          const session = await account.getSession("current")
          await account.deleteSession(session.$id)
          window.location.reload()
        } catch (error) {}
      }}
      style={{ cursor: "pointer" }}
    >
      <Text type="danger">
        <LogoutOutlined style={{ fontSize: "1rem", paddingRight: "0.5rem" }} />
        Logout
      </Text>
    </div>
  )
}
