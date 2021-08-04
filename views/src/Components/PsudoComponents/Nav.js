import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div className="py-6 px-8 flex justify-between">
            <Link className="w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">home</Link>

            <div className="flex space-x-8">
                <Link className="w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">gallery</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">blogs</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">about</Link>
            </div>
        </div>
    )
}
