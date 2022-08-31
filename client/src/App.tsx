import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {UserSlice} from "./store/reducers/UserSlice";
import {authAPI} from "./services/AuthService";


function App() {
    const {isAuth,userAuth} = useAppSelector(state => state.userReducer);
    const {login, refresh, logout} = UserSlice.actions;
    const dispatch = useAppDispatch();
    const [valueLogin, setValueLogin] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const {user} = userAuth;
    const [loginUser, {data, isLoading, error}] = authAPI.useUserLoginMutation();
    const [logoutUser, {data: data2}] = authAPI.useUserLogoutMutation();
    const {data: data1} = authAPI.useUserRefreshQuery('');

    const handleClickLogin = async () => {
        const body = {login: valueLogin, password: valuePassword};
        await loginUser(body);
    }

    const handleClickLogout = async () => {
        const body = '';
        await logoutUser(body);
    }

    useEffect(() => {
        if (data) {
            dispatch(login({userAuth: data, isAuth: true}))
        }
    }, [data]);

    useEffect(() => {
        if (data1) {
            dispatch(refresh({userAuth: data1, isAuth: true}));
        }

    }, [data1]);

    useEffect(() => {
       if (data2) {
           dispatch(logout());
       }
    }, [data2]);
    return (
        <div className="App">
            <input
                type="text"
                value={valueLogin}
                onChange={(event) => setValueLogin(event.target.value)}
                placeholder='Login'
            />
            <input
                type="password"
                value={valuePassword}
                onChange={(event) => setValuePassword(event.target.value)}
                placeholder='Password'
            />
            <button onClick={handleClickLogin}>Login</button>
            <br/>
            {isAuth && <button onClick={handleClickLogout}>Logout</button>}
            <br/>
            {user.id} <br/>
            {user.login} <br/>
            {String(isAuth)} <br/>
        </div>
    );
}

export default App;