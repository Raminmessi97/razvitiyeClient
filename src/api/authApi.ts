import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from './customFetchBase';
import { IUser } from './types';
import { userApi } from './userApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        registerUser: builder.mutation<IUser, any>({
            query(data) {
                return {
                    url: 'registration',
                    method: 'POST',
                    body: data,
                };
            },
            transformResponse: (result: {  user: IUser,access_token:string }) => {
                console.log('access_token',result.access_token)
                localStorage.setItem("access_token",result.access_token)
                return result.user
            }
        }),
        loginUser: builder.mutation<
            { access_token: string; status: string },
            any
        >({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    console.log('age',args);
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {}
            },
            transformResponse: (result: any) => {
                localStorage.setItem("access_token",result.accessToken)
                return result.user
            }
        }),
        logoutUser: builder.mutation<void, void>({
            query() {
                return {
                    url: 'auth/logout',
                    credentials: 'include',
                };
            },
        }),


    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation,

} = authApi;

