import {
  Avatar,
  Button,
  Card,
  Tag,
  Modal,
  Input,
  Select,
  Row,
  Col,
  message,
} from "antd"
import React, { useState } from "react"
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import {
  useDeleteTaskMutation,
  useGetUserSessionQuery,
  useGetUserTasksQuery,
  useUpdateTaskMutation,
} from "../redux/services/projectify"

export const TaskCard: React.FC<{
  title: string
  description: string
  due_date: string
  assigned_to: string
  assigned_by: string
  status: string
  members: { label: string; value: string }[]
  $id: string
  refetch: any
}> = ({
  title,
  description,
  due_date,
  assigned_to,
  assigned_by,
  status,
  members,
  $id,
  refetch,
}) => {
  const { data } = useGetUserSessionQuery("")
  const { refetch: refetchUserTasks } = useGetUserTasksQuery({ id: data?.$id })

  const [deleteTask, { error, data: deleteData, isLoading }] =
    useDeleteTaskMutation()
  const [updateTask, { error: updateError, isLoading: updateLoading }] =
    useUpdateTaskMutation()
  console.log(updateError)

  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [title_, setTitle] = useState(title)
  const [desc, setDesc] = useState(description)
  const [to, setTo] = useState(assigned_to)
  const [status_, setStatus] = useState(status)

  return (
    <div className="task-card">
      <Card hoverable draggable>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3>{title}</h3>
          {data?.$id === assigned_to || data?.$id === assigned_by ? (
            <div>
              <>
                <Button
                  shape="circle"
                  icon={<EditOutlined />}
                  type="dashed"
                  onClick={() => setOpenEdit(true)}
                  disabled={updateLoading ? true : false}
                />
                <Modal
                  open={openEdit}
                  onCancel={() => setOpenEdit(false)}
                  title={"Edit Task"}
                  // okButtonProps={{ style: { background: "red" } }}
                  okText={updateLoading ? <LoadingOutlined /> : "Edit Task"}
                  onOk={async () => {
                    try {
                      await updateTask({
                        id: $id,
                        title: title_,
                        description: desc,
                        status: status_,
                        assigned_to: to,
                      }).unwrap()
                      message.success("Task Updated Successfully")
                      await refetchUserTasks()
                      setOpenEdit(() => false)
                      await refetch()
                    } catch (error: any) {
                      message.error(error.message)
                    }
                  }}
                >
                  <Row gutter={[16, 24]}>
                    {data?.$id === assigned_by ? (
                      <>
                        <Col span={24}>
                          <Input
                            value={title_}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                            disabled={updateLoading ? true : false}
                          />
                        </Col>
                        <Col span={24}>
                          <Input.TextArea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                            disabled={updateLoading ? true : false}
                          />
                        </Col>
                        <Col span={24}>
                          <p>Assign To</p>
                          <Select
                            defaultValue={to}
                            style={{ width: "100%" }}
                            onChange={(value) => setTo(value)}
                            options={members}
                            disabled={updateLoading ? true : false}
                          />
                        </Col>
                      </>
                    ) : (
                      <></>
                    )}
                    <Col span={24}>
                      <p>Status</p>
                      <Select
                        defaultValue={status_}
                        style={{ width: "100%" }}
                        onChange={(value) => setStatus(value)}
                        options={[
                          { value: "completed", label: "Completed" },
                          { value: "in-progress", label: "In Progress" },
                          { value: "uncompleted", label: "Not Completed" },
                        ]}
                        disabled={updateLoading ? true : false}
                      />
                    </Col>
                  </Row>
                </Modal>
              </>
              {data?.$id === assigned_by ? (
                <>
                  <Button
                    shape="circle"
                    icon={<DeleteOutlined />}
                    type="dashed"
                    style={{ marginLeft: "0.5rem", color: "red" }}
                    onClick={() => setOpenDelete(true)}
                  />
                  <Modal
                    title="Delete Task?"
                    onCancel={() => setOpenDelete(false)}
                    open={openDelete}
                    okButtonProps={{ style: { background: "red" } }}
                    okText={isLoading ? <LoadingOutlined /> : "Delete Task"}
                    onOk={async () => {
                      try {
                        await deleteTask($id)
                        message.success("Task Deleted Successfully")
                        await refetch()
                        setOpenDelete(() => false)
                        await refetchUserTasks()
                      } catch (error: any) {
                        message.error(error.message)
                      }
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="task-card-description">
          <p>{description}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <p>
            Due:{" "}
            <span style={{ color: "red", opacity: 0.7 }}>
              {new Date(due_date).toDateString()}
            </span>
          </p>
          <div>
            <p>
              Assigned to: <Tag color="processing">{assigned_to}</Tag>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
