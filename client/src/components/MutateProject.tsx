import React, { useState } from "react"
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import { Button, Modal, Row, message, Col, Input, Select } from "antd"
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useGetUserSessionQuery,
  useUpdateProjectMutation,
} from "../redux/services/projectify"
import { useNavigate } from "react-router-dom"

export const MutateProject: React.FC<{
  $id: string
  refetch: any
  title: string
  description: string
  priority: string
  status: string
}> = ({ $id, refetch, title, description, status, priority }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()
  const [updateProject, { isLoading: isLoadingEdit }] =
    useUpdateProjectMutation()
  const { data: userData } = useGetUserSessionQuery("")
  const { refetch: refetchProjects, isLoading: isLoadingProjects } =
    useGetProjectsQuery({ jwt: userData?.jwt })
  const navigate = useNavigate()
  const [title_, setTitle] = useState(title)
  const [desc, setDesc] = useState(description)
  const [status_, setStatus] = useState(status)
  const [priority_, setPriority] = useState(priority)
  return (
    <div>
      <>
        <Button
          icon={<EditOutlined />}
          type="primary"
          onClick={() => setOpenEdit(true)}
        />
        <Modal
          title="Edit Project"
          open={openEdit}
          onCancel={() => setOpenEdit(false)}
          okText={isLoadingEdit ? <LoadingOutlined /> : "Edit Project"}
          okButtonProps={{ disabled: isLoadingEdit ? true : false }}
          onOk={async () => {
            try {
              await updateProject({
                id: $id,
                title: title_,
                description: desc,
                status: status_,
                priority: priority_,
              })
              message.success("Project Updated Successfully")
              await refetch()
              setOpenEdit(() => false)
              await refetchProjects()
            } catch (error: any) {
              message.error(error.message)
            }
          }}
        >
          <Row gutter={[16, 24]}>
            <>
              <Col span={24}>
                <Input
                  value={title_}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title"
                  disabled={isLoadingEdit ? true : false}
                />
              </Col>
              <Col span={24}>
                <Input.TextArea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                  disabled={isLoadingEdit ? true : false}
                  maxLength={150}
                />
              </Col>
              <Col span={24}>
                <p>Priority</p>
                <Select
                  defaultValue={priority_}
                  style={{ width: "100%" }}
                  onChange={(value) => setPriority(value)}
                  options={[
                    { value: "high", label: "High" },
                    { value: "mid", label: "Mid" },
                    { value: "low", label: "Low" },
                  ]}
                  disabled={isLoadingEdit ? true : false}
                />
              </Col>
              <Col span={24}>
                <p>Status</p>
                <Select
                  defaultValue={status_}
                  style={{ width: "100%" }}
                  onChange={(value) => setStatus(value)}
                  options={[
                    { value: "completed", label: "Completed" },
                    { value: "in_progress", label: "In Progress" },
                    { value: "uncompleted", label: "Not Completed" },
                  ]}
                  disabled={isLoadingEdit ? true : false}
                />
              </Col>
            </>
          </Row>
        </Modal>
      </>
      <>
        <Button
          icon={<DeleteOutlined />}
          style={{ color: "red", marginLeft: "0.5rem" }}
          disabled={isLoading ? true : false}
          onClick={() => setOpenDelete(() => true)}
        ></Button>
        <Modal
          title="Delete Project?"
          onCancel={() => setOpenDelete(false)}
          open={openDelete}
          okButtonProps={{
            style: { background: "red" },
            disabled: isLoading ? true : false,
          }}
          okText={isLoading ? <LoadingOutlined /> : "Delete Project"}
          onOk={async () => {
            try {
              await deleteProject($id)
              message.success("Project Deleted Successfully")
              setOpenDelete(() => false)
              await refetchProjects()
              navigate("/main/projects")
            } catch (error: any) {
              message.error(error.message)
            }
          }}
        />
      </>
    </div>
  )
}
