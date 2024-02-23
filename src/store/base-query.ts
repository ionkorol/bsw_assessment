import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api_base_query = fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" });
