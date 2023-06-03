import React from "react"
import { PlusSquareFilled } from "@ant-design/icons"
import { Row, Col } from "antd"
import { ProjectCard } from "../components/ProjectCard"
import { AddProject } from "../components/AddProject"
import {
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const Projects = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const { data: projectData, refetch, isLoading } = useGetProjectsQuery("")
  console.log(projectData)
  return (
    <div className="page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>All Projects</h3>
        <AddProject refetch={refetch} />
      </div>
      <div className="projects">
        <Row gutter={[26, 24]}>
          {/* TODO PROJECTS */}
          <Col xs={24} md={12} lg={8} className="todo-projects">
            <h2>
              <span /> Todo Projects
            </h2>
            {projectData?.projects.map((datum: any, key: any) => (
              <ProjectCard {...datum} key={key} />
            ))}
          </Col>

          {/* IN PROGRESS */}
          <Col xs={24} md={12} lg={8} className="working-projects">
            <h2>
              <span style={{ backgroundColor: "#1c93e1" }} /> In Progress
            </h2>
            {/* {data2.reverse().map((datum, key) => (
              <ProjectCard {...datum} key={key} />
            ))} */}
          </Col>

          {/* COMPLETED PROJECTS */}
          <Col xs={24} md={12} lg={8} className="todo-projects">
            <h2>
              <span style={{ backgroundColor: "#9BC53D" }} /> Completed Projects
            </h2>
            {/* {data3.map((datum, key) => (
              <ProjectCard {...datum} key={key} />
            ))} */}
          </Col>
        </Row>
      </div>
    </div>
  )
}
