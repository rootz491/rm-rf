import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAdmin } from '../../user.service'

export default function PrivateAdminRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render = {props => (
            isAdmin() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/' }} />
            )
        )} />
    )
}
