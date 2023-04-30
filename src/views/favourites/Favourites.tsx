import React, {useEffect, useState} from "react";
import {useLazyGetUserRepoQuery, useSearchUsersQuery} from "../../store/github/github.api";
import {useDebounce} from "../../hooks/debounce";
import Repo from "../Repo";

export default function Favourites(){
    const [search,setSearch] = useState('')
    const debounce = useDebounce(search);

    const {isLoading,isSuccess,isError,data} = useSearchUsersQuery(debounce,{
        skip:debounce.length<3
    });

    const [fetchRepos,{isLoading:isRepoLoading,data:repos}]  = useLazyGetUserRepoQuery()

    useEffect(()=>{
        console.log(debounce)
    },[debounce])


    const onClick = ()=>{
        fetchRepos(debounce);
    }

    return(
        <div className="relative w-[560px]">
            {isError && <p>Errorrrr</p>}
            <input type={"text"} className="border py-2 px-4 "
                onChange={(e)=>setSearch(e.target.value)}
            />

            <button onClick={onClick}>CC</button>
            <ul>
                {repos?.map(repo=><li key={repo.id}><Repo repo={repo} /></li>)}
            </ul>
        </div>
    )
}