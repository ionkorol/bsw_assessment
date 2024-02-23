import { createApi } from "@reduxjs/toolkit/query/react";
import { api_base_query } from "../base-query";
import { IUser } from "../../types/user.types";

export const users_api = createApi({
  reducerPath: "users_api",
  baseQuery: api_base_query,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useLazyGetUsersQuery } = users_api;
