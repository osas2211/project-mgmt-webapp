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

      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      // async onQueryStarted(
      //   arg,
      //   { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      // ) {},
      // // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      // async onCacheEntryAdded(
      //   arg,
      //   {
      //     dispatch,
      //     getState,
      //     extra,
      //     requestId,
      //     cacheEntryRemoved,
      //     cacheDataLoaded,
      //     getCacheEntry,
      //   }
      // ) {},
    }),
  }),
}
