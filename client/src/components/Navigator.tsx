import React from "react"
import { Link, useHref } from "react-router-dom"
import { Dashboard, Task, FolderCopy, VideoCall } from "@mui/icons-material"
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
            style={{ fontSize: "2.2rem", paddingRight: "1rem" }}
          />{" "}
          <Link to={"dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Icon
            component={FolderCopy}
            style={{ fontSize: "2.2rem", paddingRight: "1rem" }}
          />{" "}
          <Link to={"projects"}>Projects</Link>
        </li>
        <li>
          <Icon
            component={Task}
            style={{ fontSize: "2.2rem", paddingRight: "1rem" }}
          />{" "}
          <Link to={"tasks"}>Tasks</Link>
        </li>
        <li>
          <Icon
            component={VideoCall}
            style={{ fontSize: "2.2rem", paddingRight: "1rem" }}
          />{" "}
          <Link to={"meetings"}>Meetings</Link>
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
