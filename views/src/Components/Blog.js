import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function Blog({ match: { params: { id } } }) {
    const [markdown, setMarkdown] = useState("**loading**");

    useEffect(() => {
        const fetchBlog = () => {
            fetch(`/api/blog/${id}`)
            .then(res => res.json())
            .then(data => setMarkdown(data.content));
        }

        fetchBlog();
    }, []);

    return (
        <div className="min-h-screen bg-secondaryBg">

            <div className="p-4">
                <Link className="flex align-middle justify-center w-min px-2 border-2 border-black" to="/"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>

            <div id="blog" className="lg:flex min-h-screen p-2 border-2">
                <div id="main" className="h-auto w-100 lg:w-2/3 py-2 px-4 lg:h-auto min-h-full">

                    <h1 className="text-2xl text-center underline text-white">Blog Title</h1>

                    <ReactMarkdown plugins={[gfm, rehypeHighlight]} children={markdown} />

                </div>
                <div id="menu" className="h-auto w-100 lg:h-auto lg:w-1/3 min-h-full">
            
                </div>
            </div>

        </div>
    )
}
