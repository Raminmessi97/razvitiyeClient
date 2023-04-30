import React, { createContext, useEffect, useReducer } from 'react'
import {useGetMeQuery} from "./api/userApi";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "./hooks/redux";


const initialState = {
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT'
})

export const AuthProvider = ({ children }) => {
    const {isLoading,data:userData}  = useGetMeQuery()
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLoading) return;
        if(!userData){
            console.log('unauthorized')
            navigate('session/signin')
        }
        else{
            navigate("/profile")
        }
    },[userData,isLoading])


    if(isLoading){
        return <p>Loading...</p>
    }


    return (
        <AuthContext.Provider
            value={{
                userA:userData
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
