import { createApi } from "@reduxjs/toolkit/query/react";
import { api_base_query } from "../base-query";
import { IAlbum } from "../../types/album.types";

export const albums_api = createApi({
  reducerPath: "albums_api",
  baseQuery: api_base_query,
  tagTypes: ["Album"],
  endpoints: (build) => ({
    getAllAlbums: build.query<IAlbum[], void>({
      query: () => "/albums",
      providesTags: ["Album"],
    }),
    getUserAlbums: build.query<IAlbum[], number>({
      query: (userId) => `/albums?userId=${userId}`,
      providesTags: ["Album"],
    }),
  }),
});

export const { useGetAllAlbumsQuery, useGetUserAlbumsQuery, useLazyGetAllAlbumsQuery, useLazyGetUserAlbumsQuery } = albums_api;
