import React, { useEffect, useState } from 'react'
import BlogCard from './PsudoComponents/BlogCard'
import { Link } from 'react-router-dom';

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/blogs")
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setBlogs(data.blogs);
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className="md:min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <div className="p-4">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            <div className="grid place-content-center min-h-screen my-16 md:my-0">
                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                    {loading ?
                    <h1 className="text-navBtn text-2xl text-center">please wait</h1> :
                    blogs.map((blog, i) => {
                        return <BlogCard key={i} title={blog.title} description={blog.description} id={blog._id} thumbnail={blog.thumbnail} />
                    })}
                </div>
            </div>
        </div>
    )
}
