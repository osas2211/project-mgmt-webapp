import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { ResultType } from "antd/es/result"
import { User } from "../../types"

type buildType = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  "projectifyAPI"
>
export const mutations = {
  signUpEndpoint: (build: buildType) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: "/user/signup",
        body: body,
        method: "POST",
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: User }, meta, arg) => response.data,

      transformErrorResponse: (
        response: {
          status: number
          data: { success: boolean; message: string }
        },
        meta,
        arg
      ) => response.data.message,
    }),
  }),
  addTaskEndpoint: (build: buildType) => ({
    addTask: build.mutation({
      query: (body) => ({
        url: "/task/addTask",
        body: body,
        method: "POST",
      }),
      // // Pick out data and prevent nested properties in a hook or selector
      // transformResponse: (response: { data: User }, meta, arg) => response.data,

      // transformErrorResponse: (
      //   response: {
      //     status: number
      //     data: { success: boolean; message: string }
      //   },
      //   meta,
      //   arg
      // ) => response.data.message,
    }),
  }),

  updateTaskEndpoint: (build: buildType) => ({
    updateTask: build.mutation({
      query: (body: any) => ({
        url: `/task/update/${body.id}`,
        body,
        method: "PATCH",
      }),
    }),
  }),
  deleteTaskEndpoint: (build: buildType) => ({
    deleteTask: build.mutation({
      query: (id: string) => ({
        url: `/task/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  createProjectEndpoint: (build: buildType) => ({
    createProject: build.mutation({
      query: (body) => ({
        url: "/project/createProject",
        body,
        method: "POST",
      }),
    }),
  }),
  updateProjectEndpoint: (build: buildType) => ({
    updateProject: build.mutation({
      query: (body: {
        id: string
        priority: string
        description: string
        title: string
        status: string
      }) => ({
        url: `/project/${body.id}`,
        body,
        method: "PATCH",
      }),
    }),
  }),
  deleteProjectEndpoint: (build: buildType) => ({
    deleteProject: build.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  addCollaboratorEndpoint: (build: buildType) => ({
    addCollaborator: build.mutation({
      query: (body) => ({
        url: "/project/addCollaborator",
        body,
        method: "POST",
      }),
    }),
  }),
}
