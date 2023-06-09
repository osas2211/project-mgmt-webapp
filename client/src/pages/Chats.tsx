import React from "react"
import { Outlet } from "react-router-dom"
import { ChatsNavigator } from "../components/ChatsNavigator"

export const Chats = () => {
  return (
    <div className="chats-page page">
      <div className="chats">
        <ChatsNavigator />
        <Outlet />
      </div>
    </div>
  )
}
