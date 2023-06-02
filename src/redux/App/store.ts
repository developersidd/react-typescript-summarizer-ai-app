import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Features/api/apiSlice";

export const store = configureStore({
    reducer: {
       api: apiSlice.reducer     
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production"
});
 
export type AppDispatch  = typeof store.dispatch;
export type RootState  = ReturnType<typeof store.getState>;