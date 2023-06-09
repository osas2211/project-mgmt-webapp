import { Avatar } from "antd"
import React from "react"
import img from "../assets/user.jpg"

export const Message: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div
      className="team-route"
      style={{
        width: "auto",
        justifyContent: id === "osas2211" ? "start" : "end",
        padding: "1rem 3rem",
      }}
    >
      {id === "osas2211" && (
        <img
          src={img}
          style={{ width: "3rem", height: "3rem", borderRadius: "100%" }}
        />
      )}
      <div style={{ marginLeft: "8px" }}>
        {id === "osas2211" && (
          <h3 style={{ marginBottom: "0.3rem" }}>Osaretin Frank</h3>
        )}
        <small
          style={{
            opacity: 0.8,
            display: "inline-block",
            borderRadius: "8px",
            borderTopLeftRadius: "0",
            backgroundColor: "#fff",
            padding: "0.5rem",
            position: "relative",
            background: id === "osas2211" ? "#fff" : "#E2EAFC",
          }}
        >
          Will be pushing the code soon Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Assumenda temporibus sunt, nihil sequi placeat
          asperiores aliquid? Expedita, iusto iure! Iure, culpa. Maiores id
          ratione animi et dolore nostrum praesentium itaque.
          <small className="time" style={{ top: -20 }}>
            11am
          </small>
        </small>
      </div>
    </div>
  )
}
