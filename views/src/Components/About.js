import React from 'react'
import Nav from './PsudoComponents/Nav'

export default function About() {
    return (
        <div className="min-h-screen bg-primaryBg">
        <Nav />
        <div className="py-20 px-5">
            <h1 className="text-center text-2xl text-navBtn">
                This app is all about learning.
            </h1>
            <div className="py-4 text-center text-md font-mono">
                <p>currently JWT and how to implement it!</p>
                <p>Also React and user persistence via JWT on client-side</p>
            </div>
        </div>
        </div>
    )
}
