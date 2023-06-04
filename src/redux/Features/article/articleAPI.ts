import { apiSlice } from "../api/apiSlice";

type Summary = {
    summary: string
}

export type ErrorData = {
    error: string
}

export type Error = {
    status: number,
    data: ErrorData
}

export const articleAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSummary: builder.query<Summary, { articleUrl: string }>({
            query: (params: { articleUrl: string }) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
            transformErrorResponse(error: Error) {
                return error
            }
        })
    })
});
export const { useLazyGetSummaryQuery } = articleAPI 