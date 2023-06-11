import React, { useRef, useState } from "react"
import { Client, Account, Storage, ID } from "appwrite"
import { Button, message } from "antd"
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons"
import { useGetUserSessionQuery } from "../redux/services/projectify"
import { v4 as uuidv4 } from "uuid"

export const UploadImage = () => {
  const client = new Client()
  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(import.meta.env.VITE_PROJECT_ID)
  const storage = new Storage(client)
  const account = new Account(client)
  const [file, setFile] = useState<File>()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { data, refetch } = useGetUserSessionQuery("")
  const onUploadImage = async () => {
    setLoading(true)
    try {
      const id = uuidv4()
      await storage.createFile(import.meta.env.VITE_BUCKET_ID, id, file as File)
      const img_url = storage.getFileView(import.meta.env.VITE_BUCKET_ID, id)
      await account.updatePrefs({ profile_picture: img_url })
      await refetch()
      setLoading(false)
      message.success("Profile Picture has been UPDATED")
    } catch (error: any) {
      setLoading(false)
      message.error(error.message)
    }
  }
  return (
    <>
      <div
        style={{
          margin: "1rem 0",
          border: "1px dashed #000",
          padding: "8px",
          borderRadius: 5,
        }}
      >
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          placeholder="Choose Image"
          onChange={(e) => {
            if (!e.target.files) {
              return
            }

            setFile(e.target.files[0])
          }}
          ref={inputRef}
        />
      </div>
      <Button type="dashed" size="large" onClick={onUploadImage}>
        {loading ? (
          <LoadingOutlined />
        ) : (
          <>
            <CloudUploadOutlined style={{ paddingRight: "8px" }} />
            Upload
          </>
        )}
      </Button>
    </>
  )
}
