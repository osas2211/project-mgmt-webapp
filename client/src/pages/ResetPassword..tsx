import React from "react"
import { Logo } from "../components/Logo"
import { Link } from "react-router-dom"
import authImg from "../assets/reset.svg"
import { Form, Button, Input, Checkbox } from "antd"

export default function () {
  return (
    <div>
      <nav className="landing_desktop-nav">
        <Link to="/">
          <Logo />
        </Link>

        <div>
          <div>
            <Link to="/login" className="landing_btn_2">
              Log In
            </Link>
            <Link to="/signup" className="landing_btn_1">
              Get Started
            </Link>
          </div>
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
            Reset Password
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              color: "grey",
            }}
          >
            Input the email you signed up with.
          </p>
          <div>
            <Form layout="vertical" className="auth-form">
              <Form.Item
                label="Email"
                rules={[{ required: true, message: "email is Required." }]}
              >
                <Input
                  type="email"
                  size="large"
                  placeholder="johndoe@email.com"
                  style={{ background: "#95c4e21f", padding: "0.7rem 1rem" }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
