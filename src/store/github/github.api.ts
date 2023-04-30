import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {IRepo, IUser, ServerResponse} from "../../models/model"

export const githubApi = createApi({
    reducerPath:'github/api',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://api.github.com'
    }),
    endpoints:build=>({
        searchUsers: build.query<ServerResponse<IUser>,string>({
            query: (search) => {
                // const { start, end } = arg;
                // console.log('arg: ', arg);
                return {
                url: 'repositories',
                params: { q:search,per_page:2 },
                };
            },
        }),
        getUserRepo:build.query<IRepo[],string>({
            query:(username: string)=>({
                url:`users/${username}/repos`
            })
        })

    })
})

export const {useSearchUsersQuery,useLazyGetUserRepoQuery} = githubApi