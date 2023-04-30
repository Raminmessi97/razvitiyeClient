import { configureStore } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import {githubReducer} from "./github/github.slice";
import {authApi} from "../api/authApi";
import {userApi} from "../api/userApi";
import {userReducer} from "../features/userSlice";

export const store = configureStore({
    reducer:{
        [githubApi.reducerPath]:githubApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        userApi:userApi.reducer,
        github:githubReducer,
        userHub:userReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(githubApi.middleware,authApi.middleware,userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>