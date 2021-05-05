import {React} from 'react';
import {Redirect, Route} from 'react-router-dom';
import auth from './Auth';
import ErrorPage from './ErrorPage';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render = {props=>{
            if(auth.isAuthenticated()){
            return <Component {...props}/>
            }
            else{
                return <ErrorPage/>
            }
        }}
        />
    );
};