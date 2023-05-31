import { Button, Col, Divider, Input, Row } from "antd"
import React from "react"
import {
  LockOutlined,
  PasswordOutlined,
  Save,
  ShieldMoonOutlined,
} from "@mui/icons-material"
import { CheckCircleFilled } from "@ant-design/icons"

export const ChangePassword = () => {
  return (
    <div>
      <Divider orientation="left">
        <strong style={{ opacity: 0.9 }}>Generate Password</strong>
      </Divider>
      <Row gutter={[16, 24]} style={{ padding: 12 }}>
        <Col span={24}>
          <Input.Password
            placeholder="Current Password"
            size="large"
            prefix={<LockOutlined />}
            style={{ padding: "0.7rem" }}
            autoFocus={true}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input.Password
            placeholder="New Password"
            size="large"
            prefix={<PasswordOutlined />}
            style={{ padding: "0.7rem" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Input.Password
            placeholder="Confirm Password"
            size="large"
            prefix={<ShieldMoonOutlined />}
            style={{ padding: "0.7rem" }}
          />
        </Col>
        <Col>
          <Button type="primary" size="large" icon={<CheckCircleFilled />}>
            Save Changes
          </Button>
        </Col>
      </Row>
    </div>
  )
}
