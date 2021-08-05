import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Tags from './PsudoComponents/Tags'
import Actions from './PsudoComponents/Actions'

export default function Blog({ match: { params: { id } } }) {
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchBlog = () => {
            fetch(`/api/blog/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlog(data.blog)
                }
            });
        }
        fetchBlog();
    }, []);

    return (
        <div className="min-h-screen bg-secondaryBg">

            <div className="p-4">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            <div id="blog" className="lg:flex min-h-screen p-2">

                <div id="main" className="h-auto w-100 lg:w-2/3 py-2 px-4 lg:h-auto min-h-full overflow-hidden">
                    <h1 className="text-2xl text-center underline text-white">{blog.title}</h1>
                    <ReactMarkdown plugins={[gfm, rehypeHighlight]} children={blog.content} />
                </div>

                <div id="menu" className="h-auto w-100 lg:h-auto lg:w-1/3 min-h-full mt-8 lg:mt-0 px-6 space-y-4">
                    <Tags tags={["design", "old", "retro", "web", "app", "blog"]} />
                    <Actions delete={`/api/blog/${blog._id}/delete`} edit={`/api/blog/${blog._id}/edit`} share="/" />
                </div>

            </div>

        </div>
    )
}
