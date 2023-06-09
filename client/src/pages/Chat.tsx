import { Avatar, Button, Input } from "antd"
import React from "react"
import { useParams } from "react-router-dom"
import { useGetProjectQuery } from "../redux/services/projectify"
import { AddCollaborator } from "../components/AddCollaborator"
import { Dashboard } from "./Dashboard"
import { SendOutlined } from "@ant-design/icons"
import { Message } from "../components/Message"

export const Chat = () => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useGetProjectQuery({ id })

  return (
    <div className="in-chat">
      <div className="in-chat-header">
        <div style={{ display: "flex" }}>
          <Avatar src={data?.project.project_cover} size={"large"} />
          <div style={{ marginLeft: "0.5rem" }}>
            <h3>{data?.project.title}</h3>
            <small>{data?.members?.length} members</small>
          </div>
        </div>
        <div>
          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="click"
            maxStyle={{ cursor: "pointer" }}
          >
            {/* MEMEBRS URL */}
            {data?.members_img.map((member: any, key: any) => (
              <Avatar key={key} src={member}>
                Contributor
              </Avatar>
            ))}
          </Avatar.Group>
        </div>
      </div>
      <div className="in-chat-box">
        <div className="messages">
          <Message id="osas2211" />
          <Message id="osas2211" />
          <Message id="osas2211" />
          <Message id="osas221" />
          <Message id="osas221" />
          <Message id="osas2211" />
          <Message id="osas2211" />
          <Message id="osas221" />
          <Message id="osas2211" />
          <Message id="osas221" />
          <Message id="osas2211" />
        </div>
        <div style={{ display: "flex" }} className="message-box">
          <Input.TextArea
            placeholder="Type Message"
            style={{ height: "1rem", width: "95%", marginRight: "0.5rem" }}
          />
          <Button type="primary" icon={<SendOutlined />} children="Send" />
        </div>
      </div>
    </div>
  )
}
