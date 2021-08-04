import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogCard() {
    return (
        <div className="w-60 overflow-hidden rounded-md m-auto">
            <div className="w-full bg-white">
                <img className="h-32 m-auto" src="/favicon.ico" alt="img" />
            </div>
            <div className="px-3 py-2 space-y-2 bg-purpleBg text-white">
                <h1 className="text-center">Hello World</h1>
                <p className="text-xs text-justify h-20 overflow-ellipsis overflow-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit. Fuga similique, odio molestiae error quasi cum iste, eius blanditiis earum quod voluptas esse a commodi.
                </p>
                <Link 
                    className="flex align-middle justify-center px-2 text-xs border border-white w-14"
                    to="/blog/610ab69ebc105686f187c704"
                > 
                    <span className="mr-1">visit</span> <img width="10px" height="10px" src="/ext-link.svg" alt="external link" /> 
                </Link>
            </div>
        </div>
    )
}
