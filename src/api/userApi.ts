import { createApi } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';
import customFetchBase from './customFetchBase';
import { IUser } from './types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'users/me',
                    credentials: 'include',
                };
            },
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log('errr',error);
                }
            },
        }),
        getUsers: builder.query<IUser, null>({
            query() {
                return {
                    url: 'getUsers',
                    credentials: 'include',
                };
            },
            transformResponse: (result: {  user: IUser  }) => {
                return result.user;
            }
        }),
    }),
});

export const {useLazyGetUsersQuery,useGetMeQuery} = userApi