import React from "react"
import userImg from "../assets/user.jpg"
import { CaretDownFilled } from "@ant-design/icons"

export const UserDropDown = () => {
  return (
    <div className="user-dropdown">
      <img src={userImg} alt="user" />
      <div style={{ marginLeft: "0.5rem" }}>
        <h4>
          Osaretin Frank <CaretDownFilled style={{ fontSize: "0.8rem" }} />
        </h4>
        <p>
          <small>@osaretinfrank</small>
        </p>
      </div>
    </div>
  )
}
