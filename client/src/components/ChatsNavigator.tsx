import React from "react"
import { Avatar, Input } from "antd"
import img from "../assets/project3.png"
import { Link, useParams } from "react-router-dom"
import { TeamRoute } from "./TeamRoute"

export const ChatsNavigator = () => {
  const { id } = useParams()
  return (
    <div className="chats-navigator">
      <h2>
        Teams ChatRooms <span style={{ color: "#1c93e1" }}>(29)</span>
      </h2>
      <div style={{ margin: "1rem 0" }}>
        <Input.Search placeholder="Search Team" />
      </div>
      <div>
        <TeamRoute img={img} id={id as string} />
        <TeamRoute img={img} id={id as string} />
        <TeamRoute img={img} id={id as string} />
        <TeamRoute img={img} id={id as string} />
        <TeamRoute img={img} id={id as string} />
      </div>
    </div>
  )
}
