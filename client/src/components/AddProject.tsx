import { PlusSquareFilled, UploadOutlined } from "@ant-design/icons"
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  DatePicker,
  Upload,
  message,
  Select,
  Spin,
} from "antd"
import type { UploadProps, DatePickerProps } from "antd"
import React, { useState } from "react"
import { useCreateProjectMutation } from "../redux/services/projectify"

export const AddProject = () => {
  const [openModal, setOpenModal] = useState(false)
  const [priority, setPriority] = useState<string>()
  const [date, setDate] = useState<any>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [disabled, setDisabled] = useState(false)
  const [createProject, { data, isLoading, isError, isSuccess }] =
    useCreateProjectMutation()

  const props: UploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString)
    setDate(date)
  }

  const onCreateProject = async () => {
    try {
      setDisabled(() => true)
      const project = (await createProject({
        title,
        description,
        priority,
        end_date: date,
      }).unwrap()) as any
      message.success(project?.message)
      setDisabled(() => false)
    } catch (error: any) {
      console.log(error)
      message.error(error.data.message)
      setDisabled(() => false)
    }
  }
  return (
    <>
      <Button
        icon={!isLoading && <PlusSquareFilled />}
        type="primary"
        onClick={() => setOpenModal(() => true)}
      >
        {isLoading ? <Spin /> : "Create Project"}
      </Button>
      <Modal
        title="Create New Project"
        open={openModal}
        onCancel={() => setOpenModal(() => false)}
        onOk={onCreateProject}
        okText={isLoading ? <Spin /> : "Create Project"}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Input
              placeholder="title"
              onChange={(e) => setTitle(() => e.target.value)}
              disabled={disabled}
            />
          </Col>
          <Col span={24}>
            <Input.TextArea
              placeholder="description"
              maxLength={150}
              style={{ minHeight: 64 }}
              onChange={(e) => setDescription(() => e.target.value)}
              disabled={disabled}
            />
          </Col>
          <Col span={24}>
            <Upload {...props}>
              <Button icon={<UploadOutlined />} disabled={disabled}>
                Upload Project Cover Image
              </Button>
            </Upload>
          </Col>
          <Col span={24}>
            <span>Priority</span>
            <Select
              placeholder="priority"
              defaultValue="High"
              style={{ width: "100%" }}
              onChange={(value) => setPriority(() => value)}
              options={[
                { value: "high", label: "High" },
                { value: "mid", label: "Mid" },
                { value: "low", label: "Low" },
              ]}
              disabled={disabled}
            />
          </Col>
          <Col span={24}>
            <DatePicker
              placeholder="End Date"
              onChange={onChangeDate}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Modal>
    </>
  )
}
