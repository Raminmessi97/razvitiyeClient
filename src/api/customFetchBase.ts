import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { logout } from '../features/userSlice';

const baseUrl = `http://localhost:5000/api/`;

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("access_token");

        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions:any) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    console.log('ddddddd===',result)
    if ((result.error?.data as any)?.message === 'Unauthorized') {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult:any = await baseQuery(
                    { credentials: 'include', url: 'refresh' },
                    api,
                    extraOptions
                );


                if (refreshResult.data) {
                    const {accessToken} = refreshResult.data;
                    // Retry the initial query
                    localStorage.setItem("access_token",accessToken)
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logout());
                    // window.location.href = '/login';
                }
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export default customFetchBase;

