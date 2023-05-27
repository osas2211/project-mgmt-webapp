import React from "react"
import { Link, useHref, useLocation } from "react-router-dom"
import {
  Dashboard,
  FolderCopy,
  VideoCall,
  Group,
  TaskAltSharp,
  GroupAdd,
} from "@mui/icons-material"
import { Icon } from "@mui/material"
import { Button, Progress } from "antd"
import { Logout } from "./Logout"

export const Navigator = () => {
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
            Tasks
          </li>
        </Link>
        <Link to={"teams"}>
          <li className={pathname === "/main/teams" ? "active-nav" : ""}>
            <Icon
              component={Group}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#60B2E5",
              }}
            />{" "}
            Teams
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
        <Link to={"invitations"}>
          <li className={pathname === "/main/invitations" ? "active-nav" : ""}>
            <Icon
              component={GroupAdd}
              style={{
                fontSize: "1.7rem",
                paddingRight: "1rem",
                color: "#FFAFCC",
              }}
            />{" "}
            Invitations
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
          <small>7/10</small>
        </div>
        <Progress percent={70} status="active" style={{ padding: "0 1rem" }} />
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
