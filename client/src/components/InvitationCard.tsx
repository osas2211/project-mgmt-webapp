import React from "react"
import { Button, Divider } from "antd"
import userImg from "../assets/user.png"

export const InvitationCard: React.FC<{
  img?: string
  owner: string
  project: string
  time: string
}> = ({ img, owner, project, time }) => {
  return (
    <div className="invitation-card">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={img || userImg} alt="Project Owner" />
        <div>
          <p>
            <b>{owner}</b> invited you to contribute on <b>{project}</b>
          </p>
          <p>
            <small>{time}</small>
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Button type="dashed" size="large" style={{ marginRight: "1rem" }}>
              Decline
            </Button>
            <Button type="primary" size="large">
              Accept
            </Button>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}
