import React, { useState } from "react"
import { Logo } from "../components/Logo"
import { Link, useNavigate } from "react-router-dom"
import authImg from "../assets/auth.svg"
import { Form, Button, Input, Checkbox, notification } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { openNotification } from "../utils/openNotification"
import { MenuFoldOutlined, CloseCircleFilled } from "@ant-design/icons"
import { LandingMobileNav } from "./LandingPage"
import { Account, Client } from "appwrite"

const client = new Client()
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID)

export default function () {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [disableForm, setDisableForm] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const account = new Account(client)
  // account.get().then((obj) => console.log(obj))
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await account.createEmailSession(email, password)
      setLoading(false)
      setTimeout(() => navigate("/main/dashboard"), 700)
    } catch (error: any) {
      setLoading(false)
      throw Error(error.message)
    }
  }

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div>
      {contextHolder}
      <nav className="landing_desktop-nav">
        <Link to="/">
          <Logo />
        </Link>

        <div>
          <div
            className="landing_desktop_nav_list"
            style={{ alignItems: "space-between" }}
          >
            <Link to="/login" className="landing_btn_2">
              Log In
            </Link>
            <Link to="/signup" className="landing_btn_1">
              Get Started
            </Link>
          </div>
        </div>

        <div className="landing-mobile-nav">
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <CloseCircleFilled /> : <MenuFoldOutlined />}
          </Button>
          {collapsed && <LandingMobileNav />}
        </div>
      </nav>

      <div className="auth-page">
        <div className="auth-img">
          <img src={authImg} alt="Lady in authentication screen" />
        </div>

        <div className="auth-form-container">
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              marginBottom: "1rem",
            }}
          >
            Log in
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              color: "grey",
            }}
          >
            Your Teams, Projects, and Tasks. Together in one place.
          </p>
          <div>
            <Form
              layout="vertical"
              disabled={disableForm}
              className="auth-form"
              onSubmitCapture={async (e) => {
                e.preventDefault()
                setDisableForm(true)
                try {
                  await login(email, password)
                  openNotification(
                    "success",
                    "Authenticated",
                    "Login Successful",
                    api
                  )
                  setDisableForm(false)
                } catch (error: any) {
                  setDisableForm(false)
                  console.log(error.message)
                  openNotification(
                    "error",
                    "Authentication Failed",
                    error.message,
                    api
                  )
                }
              }}
            >
              <Form.Item
                label="Email"
                rules={[{ required: true, message: "Email is Required!" }]}
                name={"email"}
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="johndoe@email.com"
                  style={{ padding: "0.7rem 1rem" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                name={"password"}
              >
                <Input.Password
                  type="text"
                  size="large"
                  placeholder="Type your password"
                  style={{ padding: "0.7rem 1rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={{
                  marginTop: "-0.5rem",
                  // width: "100%",
                }}
              >
                <div
                  style={{
                    marginTop: "-0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Checkbox> Remember me</Checkbox>
                  <Link to="/reset-password">Forget password?</Link>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  disabled={!email ? true : !password ? true : disableForm}
                >
                  {loading ? (
                    <LoadingOutlined color="#ffffff" style={{ fontSize: 20 }} />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </Form.Item>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Don't have an account?
                <Link to="/signup"> Signup</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
