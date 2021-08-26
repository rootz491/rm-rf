import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAdmin from '../../Hooks/useAdmin';

export default function PrivateAdminRoute({ component: Component, ...rest }) {
    const admin = useAdmin();
    return (
        <Route {...rest} render = {props => (
            admin ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/' }} />
            )
        )} />
    )
}
