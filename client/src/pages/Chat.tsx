import { Avatar, Button, Input, Modal } from "antd"
import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import {
  useGetProjectQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { SendOutlined } from "@ant-design/icons"
import { Message } from "../components/Message"

export const Chat: React.FC<{ socket: any }> = ({ socket }) => {
  const { id } = useParams()
  const { data, isLoading, error, refetch } = useGetProjectQuery({ id })
  const { data: userData } = useGetUserSessionQuery("")
  const [messages, setMessages] = useState<any[]>([])
  const [message, setMessage] = useState<string>()
  const [typing, setTyping] = useState<any>({})
  const lastMessageRef = useRef<null | HTMLDivElement>(null)

  // ****************Scroll to Bottom*****************
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // ****************Join Room*****************
  useEffect(() => {
    socket.emit("join_room", {
      room_id: id,
      user_id: userData?.$id,
      user_name: userData?.name,
    })
  }, [socket, id])

  // ****************Get Messgaes*****************
  useEffect(() => {
    socket.on("get_messages", (data: any) => {
      setMessages(data)
    })
    // console.log(messages)

    return () => socket.off("get_messages")
  }, [socket, id])

  // ****************Recieve Messgae*****************
  useEffect(() => {
    socket.on("recieve_message", (data: any) => {
      setMessages((state) => [...state, data])
    })
    return () => socket.off("recieve_message")
  }, [socket])

  // ****************Someone is Typing*****************
  // useEffect(() => {
  //   socket.on("is_typing", (data: any) => {
  //     setTyping(data)
  //     console.log(data)
  //   })
  //   setTyping("")
  //   return () => socket.off("is_typing")
  // }, [socket])

  return (
    <div className="in-chat">
      <div className="in-chat-header">
        <div style={{ display: "flex" }}>
          <Avatar src={data?.project.project_cover} size={"large"} />
          <div style={{ marginLeft: "0.5rem" }}>
            <h3>{data?.project.title}</h3>
            <small>{data?.members?.length} member(s)</small>
            {/* <p style={{ color: "green", marginTop: "-0.5rem" }}>
              <small>{typing.room_id === id && typing.msg}</small>
            </p> */}
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
          {messages.map((message) => {
            return (
              <Message
                id={message.sender_id}
                message={message.message}
                name={message.sender_name}
                timestamp={`${new Date(message.timestamp).toLocaleString()} `}
                img={message.sender_image}
              />
            )
          })}
          <div ref={lastMessageRef}></div>
        </div>
        <div style={{ display: "flex" }} className="message-box">
          <Input.TextArea
            placeholder="Type Message"
            style={{ height: "1rem", width: "95%", marginRight: "0.5rem" }}
            maxLength={2500}
            onChange={(e) => {
              setMessage(e.target.value)
              // socket.emit("typing", {
              //   room_id: id,
              //   msg: `${userData?.name} is typing...`,
              // })
            }}
            // onKeyDown={() =>

            // }
            value={message}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            children="Send"
            onClick={() => {
              socket.emit("send_message", {
                sender_id: userData?.$id,
                message: message,
                sender_image: userData?.prefs?.profile_picture,
                room_id: id,
                sender_name: userData?.name,
                timestamp: new Date(),
              })
              setMessage("")
              return () => socket.off("send_message")
            }}
          />
        </div>
      </div>
    </div>
  )
}
