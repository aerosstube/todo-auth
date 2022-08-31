import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuth} from "../../models/IAuth";

export interface UserState {
    userAuth: IAuth,
    isAuth: boolean
}

const initialState: UserState = {
    userAuth: {
        accessToken: '',
        refreshToken: '',
        user: {
            id: 0,
            login: ''
        },
    },
    isAuth: false
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<UserState>) {
            state.userAuth = action.payload.userAuth;
            state.isAuth = action.payload.isAuth;
            localStorage.setItem('token', JSON.stringify(action.payload.userAuth.accessToken));
        },
        refresh(state, action: PayloadAction<UserState>) {
            state.userAuth = action.payload.userAuth;
            state.isAuth = action.payload.isAuth;
            localStorage.setItem('token', JSON.stringify(action.payload.userAuth.accessToken));
        },
        logout(state) {
            state.userAuth = initialState.userAuth;
            state.isAuth = initialState.isAuth;
            localStorage.removeItem('token')
        }


    }
});

export default UserSlice.reducer;