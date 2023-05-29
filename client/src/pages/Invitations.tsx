import React from "react"
import { InvitationCard } from "../components/InvitationCard"
import userImg from "../assets/user.png"
import userImg2 from "../assets/user.jpg"
import { NotificationOutlined } from "@ant-design/icons"

export const Invitations = () => {
  const data = [
    {
      owner: "John Doe",
      project: "Google API",
      img: userImg2,
      time: "1 hour ago",
    },
    {
      owner: "Frank Osaretin",
      project: "The Avanova Project",
      img: userImg,
      time: "Yesterday",
    },
    {
      owner: "Appwrite CEO",
      project: "Hashnode x Appwrite Hackathon",
      img: userImg,
      time: "2 weeks ago",
    },
  ]
  return (
    <div className="invitations">
      <div>
        <h2>
          Invitations
          {/* <NotificationOutlined style={{ color: "#1c93e1" }} /> */}
        </h2>
      </div>
      <div className="invitations">
        {data.map((datum, key) => (
          <InvitationCard {...datum} key={key} />
        ))}
      </div>
    </div>
  )
}
