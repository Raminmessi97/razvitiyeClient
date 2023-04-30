import React, {useEffect, useState} from "react";
import {IRepo} from "../models/model";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";

export default function Repo({repo}:{repo:IRepo}){
    const {addFavourite,removeFavourite} = useActions()

    const {favourites} = useAppSelector(state=>state.github)
    const [isFav,setIsFav] = useState(favourites.includes(repo.url))

    const addToFav  = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        addFavourite(repo.url)
        setIsFav(true)
    }

    const removeFromFav  = (event:React.MouseEvent<HTMLButtonElement>)=>{
        event.preventDefault();
        removeFavourite(repo.url)
        setIsFav(false);
    }

    return(
        <div className="relative w-[560px]">
            <h2>{repo.url}</h2>

            {!isFav &&
            <button className="border-t-neutral-400 accent-green-600"
             onClick={addToFav}
            >Add to Fav</button>
            }

            {isFav &&
            <button className="border-t-neutral-400  accent-red-500 ml-3"
                    onClick={removeFromFav}
            >Remove from Fav</button>
            }
        </div>
    )
}