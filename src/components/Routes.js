import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { selectUser,login, logout } from "../features/userSlice";
import { base_url } from "../utils/constants";
import Axios from 'axios';
import Quora from './Quora';
import Login from './auth/Login';
import Profile from './auth/Profile';
import QuestionDetail from './QuestionDetail';

const Routes = ()=>{
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    React.useEffect(() => {
        if(document.cookie){
        try{
            Axios({
            url: base_url+"/auth/profile",
            withCredentials:true
            })
            .then((res) => {
                if(res.data=="invalid token"){
                dispatch(logout())
                }else{
                dispatch(login({token:document.cookie.split("x-access-token=")[1],data:res.data}));
                }
                
            })
            .catch((err) => alert(err.message));
        }catch(err){
            window.alert(err)
        }

        }
    }, [dispatch]);
    
    return (
        <BrowserRouter>
            <Route path="/" exact component={user ? Quora  : Login } /> 
            <Route path="/login" exact component={Login } /> 
            <Route path="/profile" exact component={ user ? Profile: Login } /> 
            <Route path="/ques/:id" component={ QuestionDetail } /> 
        </BrowserRouter>
    )
}

export default Routes