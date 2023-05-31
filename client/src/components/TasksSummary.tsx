import React from "react"
import {
  AssignmentLateOutlined,
  AssignmentOutlined,
  DoneAllOutlined,
  PendingActions,
  RadioButtonCheckedOutlined,
} from "@mui/icons-material"
import { Col, Row } from "antd"
import { Icon } from "@mui/material"
import { Column, Liquid } from "@ant-design/plots"

const data = [
  {
    type: "Total Tasks",
    value: 34,
  },
  {
    type: "Completed Tasks",
    value: 12,
  },
  {
    type: "Pending Tasks",
    value: 8,
  },
  {
    type: "Uncompleted Tasks",
    value: 14,
  },
]

export const TasksSummary = () => {
  const config = {
    data,
    xField: "type",
    yField: "value",
    label: {
      position: "middle",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Tasks",
      },
      value: {
        alias: "Value",
      },
    },
  }
  return (
    <div className="user-tasks">
      <h3>
        <span></span> Tasks Progress
      </h3>
      <Row gutter={[16, 20]} className="user-tasks-summary">
        <Col
          xs={22}
          md={11}
          className="user-tasks-summary1"
          style={{ padding: "1rem" }}
        >
          <span
            style={{
              display: "inline-flex",

              alignItems: "center",
              borderRadius: 8,
              background: "#1c92e138",
              padding: "0px 8px",
              marginRight: 16,
            }}
          >
            <Icon
              component={AssignmentOutlined}
              style={{ fontSize: 30, color: "#1c93e1" }}
            />
          </span>
          <div>
            <h4>Total Tasks</h4>
            <h3>34</h3>
          </div>
          <Icon
            component={RadioButtonCheckedOutlined}
            style={{
              fontSize: 16,
              alignSelf: "center",
              justifySelf: "space-between",
              color: "#1c93e1",
            }}
            className="radio"
          />
        </Col>
        <Col
          xs={22}
          md={11}
          className="user-tasks-summary1"
          style={{ padding: "1rem" }}
        >
          <span
            style={{
              display: "inline-flex",

              alignItems: "center",
              borderRadius: 8,
              background: "#9ac53d2f",
              padding: "0px 8px",
              marginRight: 16,
            }}
          >
            <Icon
              component={DoneAllOutlined}
              style={{ fontSize: 30, color: "#9BC53D" }}
            />
          </span>
          <div>
            <h4>Completed Tasks</h4>
            <h3>12</h3>
          </div>
          <Icon
            component={RadioButtonCheckedOutlined}
            style={{
              fontSize: 16,
              alignSelf: "center",
              justifySelf: "space-between",
              color: "#9BC53D",
            }}
            className="radio"
          />
        </Col>
        <Col
          xs={22}
          md={11}
          className="user-tasks-summary1"
          style={{ padding: "1rem" }}
        >
          <span
            style={{
              display: "inline-flex",

              alignItems: "center",
              borderRadius: 8,
              background: "#ffc20c32",
              padding: "0px 8px",
              marginRight: 16,
            }}
          >
            <Icon
              component={PendingActions}
              style={{ fontSize: 30, color: "#ffc20c" }}
            />
          </span>
          <div>
            <h4>Pending Tasks</h4>
            <h3>8</h3>
          </div>
          <Icon
            component={RadioButtonCheckedOutlined}
            style={{
              fontSize: 16,
              alignSelf: "center",
              justifySelf: "space-between",
              color: "#ffc20c",
            }}
            className="radio"
          />
        </Col>
        <Col
          xs={22}
          md={11}
          className="user-tasks-summary1"
          style={{ padding: "1rem" }}
        >
          <span
            style={{
              display: "inline-flex",

              alignItems: "center",
              borderRadius: 8,
              background: "#ff595f1d",
              padding: "0px 8px",
              marginRight: 16,
            }}
          >
            <Icon
              component={AssignmentLateOutlined}
              style={{ fontSize: 30, color: "#FF595E" }}
            />
          </span>
          <div>
            <h4>Uncompleted Tasks</h4>
            <h3>14</h3>
          </div>
          <Icon
            component={RadioButtonCheckedOutlined}
            style={{
              fontSize: 16,
              alignSelf: "center",
              justifySelf: "space-between",
              color: "#FF595E",
            }}
            className="radio"
          />
        </Col>
      </Row>

      <div style={{ marginTop: "4rem" }}>
        <h3 style={{ marginBottom: "2rem" }}>
          <span></span> Overall Performance from all projects
        </h3>
        <Column {...(config as any)} />
      </div>
    </div>
  )
}
