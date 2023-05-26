import React from "react"
import { LogoutOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Account, Client } from "appwrite"

const { Text } = Typography

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6463da5b176aab1a02e1")
const account = new Account(client)

export const Logout = () => {
  return (
    <div
      onClick={async () => {
        try {
          await account.deleteSessions()
          window.location.reload()
        } catch (error) {}
      }}
    >
      <Text type="danger">
        <LogoutOutlined style={{ fontSize: "1rem", paddingRight: "0.5rem" }} />
        Logout
      </Text>
    </div>
  )
}
