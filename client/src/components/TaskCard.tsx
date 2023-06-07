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
  const [deleteTask, { error, data: deleteData, isLoading }] =
    useDeleteTaskMutation()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [title_, setTitle] = useState(title)
  const [desc, setDesc] = useState(description)
  const [to, setTo] = useState(assigned_to)
  const [status_, setStatus] = useState(status)
  console.log(deleteData)

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
                />
                <Modal
                  okText="Edit Task"
                  open={openEdit}
                  onCancel={() => setOpenEdit(false)}
                  title={"Edit Task"}
                >
                  <Row gutter={[16, 24]}>
                    {data?.$id === assigned_by ? (
                      <>
                        <Col span={24}>
                          <Input
                            value={title_}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                          />
                        </Col>
                        <Col span={24}>
                          <Input.TextArea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Description"
                          />
                        </Col>
                        <Col span={24}>
                          <p>Assign To</p>
                          <Select
                            defaultValue={to}
                            style={{ width: "100%" }}
                            onChange={(value) => setTo(value)}
                            options={members}
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
