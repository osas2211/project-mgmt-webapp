import { Avatar } from "antd"
import React from "react"
import { Link } from "react-router-dom"

export const TeamRoute: React.FC<{ img: string; id: string }> = ({
  img,
  id,
}) => {
  return (
    <Link to={`/main/chats/${id}`} className="team-route">
      <Avatar src={img} size={"large"} />
      <div style={{ marginLeft: "8px" }}>
        <h3>Osaretin Frank</h3>
        <small style={{ opacity: 0.8 }}>
          Tim: {"Will be pushing the code soon".slice(0, 20)}...
        </small>
      </div>
      <small className="time">11am</small>
    </Link>
  )
}
