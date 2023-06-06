import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query"
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { ResultType } from "antd/es/result"
import { User } from "../../types"
import { Account, Client } from "appwrite"

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
export const queries = {
  getProjectsEndpoint: (build: buildType) => {
    return {
      getProjects: build.query({
        query: (args: any) => ({
          url: `/project/projects?jwt=${args.jwt}`,
          method: "GET",
        }),
        transformResponse: (response: { data: any }, meta, arg) =>
          response.data,
      }),
    }
  },
  getProjectEndpoint: (build: buildType) => {
    return {
      getProject: build.query({
        query: ({ id }) => ({
          url: `/project/${id}`,
          method: "GET",
        }),
        transformResponse: (response: { data: any }, meta, arg) =>
          response.data,
      }),
    }
  },
  getTasksEndpoint: (build: buildType) => {
    return {
      getTasks: build.query({
        query: (args: any) => ({
          url: `/task/tasks?projectID=${args.id}`,
          method: "GET",
        }),
        transformResponse: (response: { data: any }, meta, arg) =>
          response.data,
      }),
    }
  },
}
