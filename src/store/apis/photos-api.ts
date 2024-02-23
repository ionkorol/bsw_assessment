import { createApi } from "@reduxjs/toolkit/query/react";
import { IPhoto } from "../../types/photo.types";
import { api_base_query } from "../base-query";

export const photos_api = createApi({
  reducerPath: "photos_api",
  baseQuery: api_base_query,
  tagTypes: ["Photo"],
  endpoints: (build) => ({
    getPhotos: build.query<IPhoto[], number | void>({
      query: (albumId) => ({
        url: "/photos",
        params: {
          albumId,
        },
      }),
      providesTags: ["Photo"],
    }),
  }),
});

export const { useGetPhotosQuery } = photos_api;
