import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import authenticationReducer from './features/Authentication/AuthenticationSlice';
export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        authentication:authenticationReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
});
setupListeners(store.dispatch);