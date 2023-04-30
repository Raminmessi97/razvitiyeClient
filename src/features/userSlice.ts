import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../api/types';
import {githubSlice} from "../store/github/github.slice";

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
