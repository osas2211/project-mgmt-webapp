import { Avatar } from "antd"
import React from "react"
import { useGetUserSessionQuery } from "../redux/services/projectify"

export const Message: React.FC<{
  id: string
  message: string
  timestamp: string
  name: string
  img: string
}> = ({ id, message, timestamp, name, img }) => {
  const { data } = useGetUserSessionQuery("")
  return (
    <div
      className="team-route"
      style={{
        width: "auto",
        justifyContent:
          id === data?.$id ? "end" : id === "chat_bot" ? "center" : "start",
        padding: "1rem 3rem",
      }}
    >
      {id === data?.$id || id === "chat_bot" ? (
        <></>
      ) : (
        <img
          src={img}
          style={{ width: "3rem", height: "3rem", borderRadius: "100%" }}
        />
      )}
      <div style={{ marginLeft: "8px" }}>
        {id === data?.$id || id === "chat_bot" ? (
          <></>
        ) : (
          <h3 style={{ marginBottom: "0.3rem" }}>{name}</h3>
        )}
        <small
          style={{
            opacity: 0.8,
            width: "auto",
            display: "inline-block",
            borderRadius: "8px",
            borderTopLeftRadius: "0",
            backgroundColor: "#fff",
            padding: "0.5rem",
            position: "relative",
            fontFamily: id === "chat_bot" ? "cursive" : "inherit",
            fontStyle: "italic",
            background:
              id === data?.$id
                ? "#CAFFB9"
                : id === "chat_bot"
                ? "#EDEDE9"
                : "#fff",
          }}
        >
          {/* Will be pushing the code soon Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Assumenda temporibus sunt, nihil sequi placeat
          asperiores aliquid? Expedita, iusto iure! Iure, culpa. Maiores id */}
          {message}
          {id !== "chat_bot" && (
            <small
              className="time"
              style={{
                top: -20,
                display: "block",
                width: "10rem",
                right: id === data?.$id ? -20 : "initial",
              }}
            >
              {timestamp}
            </small>
          )}
        </small>
      </div>
    </div>
  )
}
