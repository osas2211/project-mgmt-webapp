import React from "react"
import { Link, useHref } from "react-router-dom"
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
  return (
    <aside className="nav-bar">
      <ul>
        <li>
          <Icon
            component={Dashboard}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#9BC53D",
            }}
          />{" "}
          <Link to={"dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Icon
            component={FolderCopy}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#294D4A",
            }}
          />{" "}
          <Link to={"projects"}>Projects</Link>
        </li>
        <li>
          <Icon
            component={TaskAltSharp}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#FF595E",
            }}
          />{" "}
          <Link to={"tasks"}>Tasks</Link>
        </li>
        <li>
          <Icon
            component={Group}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#60B2E5",
            }}
          />{" "}
          <Link to={"meetings"}>Teams</Link>
        </li>
        <li>
          <Icon
            component={VideoCall}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#FEE440",
            }}
          />{" "}
          <Link to={"meetings"}>Meetings</Link>
        </li>
        <li>
          <Icon
            component={GroupAdd}
            style={{
              fontSize: "1.7rem",
              paddingRight: "1rem",
              color: "#FFAFCC",
            }}
          />{" "}
          <Link to={"invitations"}>Invitations</Link>
        </li>
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
