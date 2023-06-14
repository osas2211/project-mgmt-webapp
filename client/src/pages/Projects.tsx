import React from "react"
import { PlusSquareFilled } from "@ant-design/icons"
import { Row, Col, Spin } from "antd"
import { ProjectCard } from "../components/ProjectCard"
import { AddProject } from "../components/AddProject"
import {
  useGetProjectsQuery,
  useGetUserSessionQuery,
} from "../redux/services/projectify"

export const Projects = () => {
  const { data: userData } = useGetUserSessionQuery("")
  const {
    data: projectData,
    refetch,
    isLoading,
    error,
  } = useGetProjectsQuery({ jwt: userData?.jwt })
  // if (error) window.location.reload()

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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "Center",
            width: "100%",
            height: "20rem",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <>
          {projectData.projects.length === 0 ? (
            <h1 style={{ opacity: 0.5, textAlign: "center", marginTop: 64 }}>
              No Project
            </h1>
          ) : (
            <>
              <div className="projects">
                <Row gutter={[26, 24]}>
                  {/* TODO PROJECTS */}
                  <Col xs={24} md={12} lg={8} className="todo-projects">
                    <h2>
                      <span /> Todo Projects
                    </h2>
                    {projectData?.projects
                      .filter(
                        (project: any) => project.status === "uncompleted"
                      )
                      .map((datum: any, key: any) => (
                        <ProjectCard {...datum} key={datum.$id} />
                      ))}
                  </Col>

                  {/* IN PROGRESS */}
                  <Col xs={24} md={12} lg={8} className="working-projects">
                    <h2>
                      <span style={{ backgroundColor: "#1c93e1" }} /> In
                      Progress
                    </h2>
                    {projectData?.projects
                      .filter(
                        (project: any) => project.status === "in_progress"
                      )
                      .map((datum: any, key: any) => (
                        <ProjectCard {...datum} key={datum.$id} />
                      ))}
                  </Col>

                  {/* COMPLETED PROJECTS */}
                  <Col xs={24} md={12} lg={8} className="todo-projects">
                    <h2>
                      <span style={{ backgroundColor: "#9BC53D" }} /> Completed
                      Projects
                    </h2>
                    {projectData?.projects
                      .filter((project: any) => project.status === "completed")
                      .map((datum: any, key: any) => (
                        <ProjectCard {...datum} key={datum.$id} />
                      ))}
                  </Col>
                </Row>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
