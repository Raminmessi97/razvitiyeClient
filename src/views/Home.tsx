import React, {useEffect, useState} from "react";
import {useAppSelector} from "../hooks/redux";

export default function Home(){

    const {favourites} = useAppSelector(state=>state.github)
    if(!favourites.length) return <p>NO items</p>

    return(
        <div className="relative w-[560px]">
            <ul className="list-none">
                {favourites.map((fav,key)=> <li key={key} >{fav}</li>)}
            </ul>
        </div>
    )
}