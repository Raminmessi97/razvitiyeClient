import React, { createContext, useEffect, useReducer } from 'react'
import {useGetMeQuery, userApi} from "./api/userApi";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAppSelector} from "./hooks/redux";

const initialState = {
}


export const AuthGuard = () => {
    const {data:user,isLoading, isFetching } = useGetMeQuery(null, {
        skip: false
    });
    const location = useLocation();



    if(isLoading){
        return <p> Data gelir ..... gozle </p>
    }




    return (user) ? (
        <Outlet />):
        ( <Navigate to='/session/signin' state={{ from: location }} replace />
    );
}

export default AuthGuard
