import React from "react"
import { Avatar, Input } from "antd"
import img from "../assets/project3.png"
import { Link, useParams } from "react-router-dom"
import { TeamRoute } from "./TeamRoute"
import {
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const ChatsNavigator: React.FC<{ socket: any }> = ({ socket }) => {
  const { data: userData } = useGetUserSessionQuery("")
  const { data, isLoading } = useGetProjectsQuery({ jwt: userData?.jwt })
  const { id } = useParams()
  return (
    <div className="chats-navigator">
      <h2>
        Teams ChatRooms{" "}
        <span style={{ color: "#1c93e1" }}>({data?.projects.length})</span>
      </h2>
      <div style={{ margin: "1rem 0" }}>
        <Input.Search placeholder="Search Team" />
      </div>
      <div>
        {data?.projects.map((project: any) => {
          return (
            <TeamRoute
              title={project.title}
              img={project.project_cover}
              id={project.$id as string}
              key={project.$id}
              last_message={JSON.parse(project?.last_message)}
              socket={socket}
            />
          )
        })}
      </div>
    </div>
  )
}
