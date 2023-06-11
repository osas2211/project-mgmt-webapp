import React from "react"
import { Outlet } from "react-router-dom"
import { ChatsNavigator } from "../components/ChatsNavigator"

export const Chats: React.FC<{
  socket: any
}> = ({ socket }) => {
  return (
    <div className="chats-page page">
      <div className="chats">
        <ChatsNavigator socket={socket} />
        <Outlet />
      </div>
    </div>
  )
}
