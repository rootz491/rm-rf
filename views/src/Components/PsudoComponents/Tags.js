import React from 'react'
import { Link } from 'react-router-dom'

export default function Tags(props) {
    return (
        <div className="lg:sticky lg:top-20 m-auto w-1/2 py-2 px-4 lg:w-auto border-4 border-navBtn rounded-md">
            <h1 className="text-navBtn text-center md:text-left">#TAGS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
                {props.tags.map((tag, i) => {
                    return <Link key={i} to="/" className="px-4 py-1 w-min text-center bg-navBtn rounded-md text-white m-auto">{tag}</Link>
                })}
            </div>
        </div>
    )
}
