import {
  LoadingOutlined,
  PlusSquareFilled,
  UploadOutlined,
} from "@ant-design/icons"
import {
  Button,
  Modal,
  Col,
  Row,
  Input,
  DatePicker,
  message,
  Select,
  Spin,
} from "antd"
import type { DatePickerProps } from "antd"
import React, { useRef, useState } from "react"
import {
  useCreateProjectMutation,
  useGetUserSessionQuery,
} from "../redux/services/projectify"
import { Client, ID, Storage } from "appwrite"
import { v4 as uuidv4 } from "uuid"
import { Tags } from "./Tags"
import { Tags as Links } from "./Tags"

export const AddProject: React.FC<{ refetch: any }> = ({ refetch }) => {
  const [openModal, setOpenModal] = useState(false)
  const [priority, setPriority] = useState<string>("high")
  const [tags, setTags] = useState<string[]>([])
  const [date, setDate] = useState<any>()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [disabled, setDisabled] = useState(false)
  const [createProject, { data, isLoading, isError, isSuccess }] =
    useCreateProjectMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const { data: userData } = useGetUserSessionQuery(null)
  const [file, setFile] = useState<File>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const jwt = userData && userData.jwt
  const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_PROJECT_ID)
  const storage = new Storage(client)
  const uploadImage = async () => {
    const id = uuidv4()
    const image = await storage.createFile(
      import.meta.env.VITE_BUCKET_ID,
      id,
      file as File
    )
    const img_url = storage.getFileView(import.meta.env.VITE_BUCKET_ID, id)
    return img_url
  }
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(date)
  }

  const onCreateProject = async () => {
    try {
      setDisabled(() => true)
      setLoading(() => true)
      let project_cover: URL | string = ""
      if (file) project_cover = await uploadImage()
      const project = (await createProject({
        title,
        description,
        priority,
        end_date: date,
        project_cover,
        tags,
        email: userData?.email,
      }).unwrap()) as any
      message.success(project?.message)
      setDisabled(() => false)
      setLoading(false)
      setOpenModal(false)
      await refetch()
    } catch (error: any) {
      console.log(error)
      message.error(error?.data?.message)
      setDisabled(() => false)
      setLoading(false)
    }
  }
  return (
    <>
      <Button
        icon={!loading && <PlusSquareFilled />}
        type="primary"
        onClick={() => setOpenModal(() => true)}
        disabled={disabled}
      >
        {loading ? (
          <LoadingOutlined color="#ffffff" style={{ fontSize: 20 }} />
        ) : (
          "Create Project"
        )}
      </Button>
      <Modal
        title="Create New Project"
        open={openModal}
        onCancel={() => setOpenModal(() => false)}
        onOk={onCreateProject}
        okText={
          loading ? (
            <LoadingOutlined color="#ffffff" style={{ fontSize: 20 }} />
          ) : (
            "Create Project"
          )
        }
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
            <p>Upload Cover Image</p>
            <input
              placeholder="Upload Cover Image"
              onChange={(e) => {
                if (!e.target.files) {
                  return
                }

                setFile(e.target.files[0])
              }}
              ref={inputRef}
              disabled={disabled}
              type="file"
            />
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
            <p>Add Tags</p>
            <Tags tags={tags} setTags={setTags} />
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
