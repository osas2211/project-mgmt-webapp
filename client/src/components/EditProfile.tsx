import React from "react"
import { Button, Divider, Row, Col, Input } from "antd"
import userImg from "../assets/user.png"
import { CloudUpload } from "@mui/icons-material"

export const EditProfile = () => {
  const { TextArea } = Input
  return (
    <div className="edit-profile">
      <Divider orientation="left">
        <strong style={{ opacity: 0.9 }}>Public Information</strong>
      </Divider>
      <div className="public-info">
        <Row gutter={[16, 24]} style={{ marginTop: 30 }}>
          <Col xs={24} md={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={userImg} alt="User Icon" />

              {/* ++++++++++++++ Upload Image +++++++++++++ */}
              <Button type="dashed" size="large">
                <span style={{ display: "flex", alignItems: "center" }}>
                  <CloudUpload style={{ paddingRight: "0.5rem" }} />
                  <span>Upload</span>
                </span>
              </Button>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <Row gutter={[16, 24]}>
              <Col xs={24} md={12}>
                <Input placeholder="Full Name" size="large" />
              </Col>
              <Col xs={24} md={12}>
                <Input placeholder="Phone" size="large" />
              </Col>
              <Col span={24}>
                <TextArea
                  showCount
                  maxLength={100}
                  style={{ minHeight: 180, marginBottom: 24 }}
                  placeholder="Bio"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="left">
          <strong style={{ opacity: 0.9 }}>Social Information</strong>
        </Divider>
        <Row gutter={[16, 24]} style={{ marginTop: 30 }}>
          <Col xs={24} md={12} lg={8}>
            <Input placeholder="Website" size="large" style={{ padding: 12 }} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Instagram"
              size="large"
              style={{ padding: 12 }}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input placeholder="Twitter" size="large" style={{ padding: 12 }} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Facebook"
              size="large"
              style={{ padding: 12 }}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input placeholder="Discord" size="large" style={{ padding: 12 }} />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Telegram"
              size="large"
              style={{ padding: 12 }}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}
