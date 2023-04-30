import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GithubState {
    favourites:string[]
}

const initialState:GithubState = {
    favourites:JSON.parse(localStorage.getItem("key1")??'[]')
}

export const githubSlice = createSlice({
    name:"github",
    initialState,
    reducers:{
        addFavourite(state,action:PayloadAction<string>){
            state.favourites.push(action.payload)
            localStorage.setItem("key1",JSON.stringify(state.favourites))
        },
        removeFavourite(state,action:PayloadAction<string>){
            state.favourites = state.favourites.filter(st=>st !== action.payload)
            localStorage.setItem("key1",JSON.stringify(state.favourites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer