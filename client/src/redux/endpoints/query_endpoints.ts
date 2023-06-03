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
  getProject: (build: buildType) => {
    return {
      createProject: build.query({
        query: () => ({
          url: "/project/projects",
          method: "GET",
          headers: {},
        }),
        transformResponse: (response: { data: any }, meta, arg) =>
          response.data,
      }),
    }
  },
}
