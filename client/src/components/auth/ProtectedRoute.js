import React from 'react'
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state => state.token);
    const history = useHistory();

    return (
        // (token) ?
        //     <Component />
        //     :
        //     history.replace("/")
        < Route {...rest} render={() => {
            (token) ?
                <Component />
                :
                history.replace("/login");
        }}
        />
    )
}

export default ProtectedRoute




