import {useDispatch} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {githubActions} from "../store/github/github.slice";
import {userActions} from "../features/userSlice";


const actions = {
    ...githubActions,
    ...userActions
}

export const useActions = ()=>{
    const dispatch = useDispatch();
    return bindActionCreators(actions,dispatch)
}
