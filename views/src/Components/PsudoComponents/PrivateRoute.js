import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../../user.service'

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render = {props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
        )} />
    )
}
