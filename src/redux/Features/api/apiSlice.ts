import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders(headers) {
        headers.set("X-RapidAPI-Key", import.meta.env.VITE_RAPID_API_ARTICLE_KEY);
        headers.set("X-RapidAPI-Host", import.meta.env.VITE_RAPID_API_ARTICLE_HOST);
        return headers
    },
});


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: async (arg, api, extraOptions) => {
        const result = baseQuery(arg, api, extraOptions);
        return result;
    },
    endpoints: () => ({}),
});