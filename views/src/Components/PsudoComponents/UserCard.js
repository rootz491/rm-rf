import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCard(props) {
    return (
        <div className="w-60 overflow-hidden rounded-md m-auto">
            <div className="w-full bg-white">
                <img className="h-28 m-auto" src={props.thumbnail} alt="img" />
            </div>
            <div className="px-3 py-2 bg-purpleBg text-white">
                <p className="text-xs text-justify h-6 overflow-ellipsis overflow-hidden">username: {props.username}</p>
                <p className="text-xs text-justify h-6 overflow-ellipsis overflow-hidden">role: {props.role}</p>
                <Link 
                    className="flex align-middle justify-center px-2 text-xs border border-white w-24 rounded-sm"
                    to={`/user/${props.id}`}
                > 
                    <span className="mr-1">open user</span> <img width="10px" height="10px" src="/ext-link.svg" alt="external link" /> 
                </Link>
            </div>
        </div>
    )
}
