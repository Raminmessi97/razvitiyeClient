import React, {useEffect, useState} from "react";
import {useAppSelector} from "../hooks/redux";

export default function Profile(){

    // const {user} = useAppSelector(state=>state.userApi)
    const {user} = useAppSelector(state=>state.userHub)
    // if(!favourites.length) return <p>NO items</p>


    return(
        <div className="relative w-[560px]">
            <p>Profile</p>
            {user?.email}
        </div>
    )
}