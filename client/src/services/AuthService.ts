import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_URL} from "./index";
import {IAuth} from "../models/IAuth";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/user`}),
    endpoints: (build) => ({
        userLogin: build.mutation<IAuth, { login: string | null, password: string | null }>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),
        userRefresh: build.query<IAuth, string>({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            })
        }),
        userLogout: build.mutation<IAuth, string>({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        })
    })
});