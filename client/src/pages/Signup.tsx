import React, { useState } from "react"
import { Logo } from "../components/Logo"
import { Link } from "react-router-dom"
import authImg from "../assets/signup.svg"
import { Form, Button, Input, Checkbox, notification } from "antd"
import { FormInstance, useForm } from "antd/es/form/Form"
import { openNotification } from "../utils/openNotification"
import {
  CloseCircleFilled,
  LoadingOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons"
import { LandingMobileNav } from "./LandingPage"
import { useSignUpMutation } from "../redux/services/projectify"
import { useNavigate } from "react-router-dom"

export default function () {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPswd, setConfirmPswd] = useState<string>("")
  const [disableForm, setDisableForm] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const [form] = useForm<FormInstance>()
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const [signup, { isLoading, error, data, isSuccess, isError }] =
    useSignUpMutation()

  const createUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableForm(true)
    try {
      // Sign Up Logic
      const fullname = `${firstName} ${lastName}`
      await signup({ fullname, email, password, username: userName }).unwrap()
      form.resetFields()
      openNotification("success", "Signed Up", "Sign Up Successful", api)
      setTimeout(() => navigate("/main/profile"), 500)
      setDisableForm(false)
    } catch (error: any) {
      setDisableForm(false)
      console.log(error)
      openNotification("error", "Sign Up Failed", error, api)
    }
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
            Sign Up
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
              className="auth-form"
              disabled={disableForm}
              onSubmitCapture={createUserProfile}
              form={form}
            >
              <Form.Item
                label="First Name"
                rules={[{ required: true, message: "First Name is Required." }]}
                name={"firstName"}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="John"
                  style={{ padding: "0.7rem 1rem" }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                rules={[{ required: true, message: "Last Name is Required." }]}
                name={"lastName"}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="Doe"
                  style={{ padding: "0.7rem 1rem" }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="E-mail"
                rules={[
                  { required: true, message: "E-mail is Required." },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
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
                label="Username"
                rules={[{ required: true, message: "UserName is Required." }]}
                name={"userName"}
              >
                <Input
                  type="text"
                  size="large"
                  placeholder="@JohnDoe"
                  style={{ padding: "0.7rem 1rem" }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                rules={[{ required: true, message: "Password is Required." }]}
                name={"password"}
                hasFeedback
              >
                <Input.Password
                  type="password"
                  size="large"
                  placeholder="Type your password"
                  style={{ padding: "0.7rem 1rem" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Incorrect Password.",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      )
                    },
                  }),
                ]}
                name={"confirmPassword"}
                hasFeedback
              >
                <Input.Password
                  type="password"
                  size="large"
                  placeholder="Confirm your password"
                  style={{ padding: "0.7rem 1rem" }}
                  value={confirmPswd}
                  onChange={(e) => setConfirmPswd(e.target.value)}
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
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  disabled={
                    !email
                      ? true
                      : !password
                      ? true
                      : !confirmPswd
                      ? true
                      : !firstName
                      ? true
                      : !lastName
                      ? true
                      : disableForm
                  }
                >
                  {isLoading ? (
                    <LoadingOutlined color="#ffffff" style={{ fontSize: 20 }} />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form.Item>
              <p style={{ textAlign: "center", marginTop: "1rem" }}>
                Already have an account?
                <Link to="/login"> Log In</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
