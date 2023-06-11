import React, { useState } from "react"
import { Button, Modal, Input, message } from "antd"
import { LoadingOutlined, TeamOutlined } from "@ant-design/icons"
import {
  useAddCollaboratorMutation,
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const AddCollaborator: React.FC<{
  refetch: any
  id: string
  socket: any
}> = ({ refetch, id, socket }) => {
  const [userName, setUserName] = useState("")
  const [open, setOpen] = useState(false)
  const { data: userData } = useGetUserSessionQuery("")
  const { refetch: refetchProjects } = useGetProjectsQuery({
    jwt: userData?.jwt,
  })
  const [addCollaborator, { isLoading, error }] = useAddCollaboratorMutation()
  return (
    <>
      <Button
        type="primary"
        icon={<TeamOutlined />}
        onClick={() => setOpen(() => true)}
      >
        Add Collaborator
      </Button>
      <Modal
        open={open}
        okText={isLoading ? <LoadingOutlined /> : "Add Collaborator"}
        okButtonProps={{ icon: <TeamOutlined /> }}
        onOk={async () => {
          try {
            await addCollaborator({
              userID: userName,
              projectID: id,
            }).unwrap()
            message.success("Collaborator Added")
            await refetch()
            await refetchProjects()
            socket.emit("send_message", {
              sender_id: "chat_bot",
              message: `${userData?.name} just added ${userName} to the team`,
              sender_image: userData?.prefs?.profile_picture,
              room_id: id,
              sender_name: "Chat Bot",
              timestamp: new Date(),
            })
            setUserName("")
            setOpen(false)
            return () => socket.off("send_message")
          } catch (err: any) {
            message.error(err.data.message)
          }
        }}
        title="Add Collaborator"
        onCancel={() => setOpen(() => false)}
      >
        <Input
          placeholder="userName of Collaborator"
          disabled={isLoading ? true : false}
          onChange={(e) => setUserName(() => e.target.value)}
        />
      </Modal>
    </>
  )
}
