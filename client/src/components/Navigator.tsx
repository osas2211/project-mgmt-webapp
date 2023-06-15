import React from "react"
import { Link, useHref, useLocation } from "react-router-dom"
import {
  Dashboard,
  FolderCopy,
  VideoCall,
  Group,
  TaskAltSharp,
  GroupAdd,
  ChatOutlined,
  Bolt,
} from "@mui/icons-material"
import { Icon } from "@mui/material"
import { Button, Progress } from "antd"
import { Logout } from "./Logout"
import {
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const Navigator = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const { data } = useGetProjectsQuery({ jwt: userData?.jwt })
  const { pathname } = useLocation()
  return (
    <aside className="nav-bar">
      <ul>
        <Link to={"dashboard"}>
          <li className={pathname === "/main/dashboard" ? "active-nav" : ""}>
            <Icon
              component={Dashboard}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#9BC53D",
              }}
            />{" "}
            Dashboard
          </li>
        </Link>
        <Link to={"projects"}>
          <li className={pathname === "/main/projects" ? "active-nav" : ""}>
            <Icon
              component={FolderCopy}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#294D4A",
              }}
            />{" "}
            Projects
          </li>
        </Link>
        <Link to={"tasks"}>
          <li className={pathname === "/main/tasks" ? "active-nav" : ""}>
            <Icon
              component={TaskAltSharp}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#FF595E",
              }}
            />{" "}
            Workload
          </li>
        </Link>
        <Link to={"chats"}>
          <li className={pathname === "/main/chats" ? "active-nav" : ""}>
            <Icon
              component={ChatOutlined}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#60B2E5",
              }}
            />{" "}
            Chats
          </li>
        </Link>
        <Link to={"meetings"}>
          <li className={pathname === "/main/meetings" ? "active-nav" : ""}>
            <Icon
              component={VideoCall}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#FEE440",
              }}
            />{" "}
            Meetings
          </li>
        </Link>
        <Link to={"timer"}>
          <li className={pathname === "/main/timer" ? "active-nav" : ""}>
            <Icon
              component={Bolt}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#FFAFCC",
              }}
            />{" "}
            Be Productive
          </li>
        </Link>
      </ul>

      <div className="nav-down">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.3rem 1rem",
          }}
        >
          <small>Projects</small>
          <small>
            {
              data?.projects.filter(
                (project: any) => project?.status === "completed"
              )?.length
            }
            /{data?.projects?.length}
          </small>
        </div>
        <Progress
          percent={Math.round(
            (data?.projects.filter(
              (project: any) => project?.status === "completed"
            )?.length /
              data?.projects?.length) *
              100
          )}
          status="active"
          style={{ padding: "0 1rem" }}
        />
        <Button
          type="dashed"
          style={{ width: "90%", margin: "auto", display: "block" }}
        >
          <Logout />
        </Button>
      </div>
    </aside>
  )
}
