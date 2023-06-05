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
  createProjectEndpoint: (build: buildType) => ({
    createProject: build.mutation({
      query: (body) => ({
        url: "/project/createProject",
        body,
        method: "POST",
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
