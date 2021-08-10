import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogCard(props) {
    return (
        <div className="w-60 overflow-hidden rounded-md m-auto">
            <div className="w-full bg-white">
                <img className="h-32 m-auto" src={props.thumbnail} alt="img" />
            </div>
            <div className="px-3 py-2 space-y-2 bg-purpleBg text-white">
                <h1 className="text-center">{props.title}</h1>
                <p className="text-xs text-justify h-12 overflow-ellipsis overflow-hidden">{props.description}</p>
                <Link 
                    className="flex align-middle justify-center px-2 text-xs border border-white w-14"
                    to={`/blog/${props.id}`}
                > 
                    <span className="mr-1">visit</span> <img width="10px" height="10px" src="/ext-link.svg" alt="external link" /> 
                </Link>
            </div>
        </div>
    )
}
