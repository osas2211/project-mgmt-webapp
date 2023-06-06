import React, { useState } from "react"
import { Button, Modal, Input, message } from "antd"
import { LoadingOutlined, TeamOutlined } from "@ant-design/icons"
import {
  useAddCollaboratorMutation,
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const AddCollaborator: React.FC<{ refetch: any; id: string }> = ({
  refetch,
  id,
}) => {
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
