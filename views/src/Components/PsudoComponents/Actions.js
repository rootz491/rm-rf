import React from 'react'
import { Link } from 'react-router-dom'

export default function Actions(props) {
    return (
        <div className="lg:sticky lg:top-56 m-auto w-1/2 py-2 px-4 lg:w-auto border-4 border-navBtn rounded-md">
            <h1 className="text-navBtn">ACTIONS</h1>
            <div className="flex gap-5 mt-4">
                <Link to={props.edit} className="px-4 py-1 w-min text-center bg-navBtn rounded-md text-white">edit</Link>
                <Link to={props.delete} className="px-4 py-1 w-min text-center bg-navBtn rounded-md text-white">delete</Link>
                <Link to={props.share} className="px-4 py-1 w-min text-center bg-navBtn rounded-md text-white">share</Link>
            </div>
        </div>
    )
}
