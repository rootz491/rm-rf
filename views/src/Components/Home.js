import React, { useEffect, useState } from 'react'
import Nav from './PsudoComponents/Nav'
import BlogCard from './PsudoComponents/BlogCard'

export default function Home() {
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        fetch("/api/blogs/latest")
        .then(res => res.json())
        .then(data => (data.success) ? setBlog(data.blog) : null)
    }, []);

    return (
        <div className="min-h-screen bg-primaryBg">
            <Nav />
            <div className="grid gap-20 md:flex w-100 h-full mt-32 md:my-32">

                <div className="flex-1 h-3/4 grid place-content-center">
                    <div className="space-y-3">
                        <h1 className="font-mono text-3xl text-center">Latest</h1>
                        {blog ?
                        <BlogCard title={blog.title} id={blog._id} description={blog.description} /> :
                        "Please wait, Loading"
                        }
                    </div>
                </div>
                
                <div className="flex-1 h-1/2 md:h-3/4 grid place-content-center">
                    <img className="md:w-80 w-64" src="/main-cover.svg" alt="big svg"/>
                </div>

            </div>
        </div>
    )
}
