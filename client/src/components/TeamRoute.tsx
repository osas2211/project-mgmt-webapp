import { Avatar } from "antd"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export const TeamRoute: React.FC<{
  img: string
  id: string
  title: string
  last_message: { user_id: string; message: string; timestamp: string }
  socket: any
}> = ({ img, id, title, last_message, socket }) => {
  const [message, setMessage] = useState(last_message)
  useEffect(() => {
    socket.on("last_message", (data: any) => {
      console.log(data)
      if (data.room_id === id) {
        setMessage({
          user_id: data.user_id,
          message: data.message,
          timestamp: data.timestamp,
        })
      }
    })
    return () => socket.off("last_message")
  }, [socket])
  return (
    <Link to={`/main/chats/${id}`} className="team-route">
      <Avatar src={img} size={"large"} />
      <div style={{ marginLeft: "8px" }}>
        <h3>{title}</h3>
        <small style={{ opacity: 0.8 }}>
          {/* {message.user_id}: {message.message.slice(0, 20)}... */}
          {`${message.user_id}: ${message.message}`.slice(0, 28)}...
        </small>
      </div>
      <small className="time">
        {new Date(message.timestamp).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </small>
    </Link>
  )
}
