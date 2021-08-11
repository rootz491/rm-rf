import React, { useEffect, useState } from 'react'
import BlogCard from './PsudoComponents/BlogCard'
import { getBearer, getUserId, getUsername, isAdmin } from '../user.service';
import Nav from './PsudoComponents/Nav';

export default function Profile({ match: { params: { id } } }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);


    useEffect(() => {
        const userId = id ? id : getUserId();
        const fetchBlogs = async () => {
            const authToken = await getBearer();
            fetch(`/api/blogs`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": authToken
                },
                body: JSON.stringify({ userId })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    if (data.blogs.length === 0) setUnavailable(true);
                    else setLoading(false);
                    setBlogs(data.blogs);
                }
                else {
                    setUnavailable(true);
                }
            });
        }
        fetchBlogs();
    }, [id]);

    return (
        <div className="min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <Nav />
            <div className="grid place-content-center sm:my-16 md:my-0">
                { id ? null :
                    <div className="h-44 my-4 space-y-2">
                        <div className="flex space-x-4 text-xl text-navBtn">
                            <h1>username:</h1>
                            <p>{getUsername()}</p>
                        </div>
                        <div className="flex space-x-4 text-xl text-navBtn">
                            <h1>Role:</h1>
                            <p>{isAdmin() ? "admin" : "user"}</p>
                        </div>
                    </div>
                }
                <div className="mb-6">
                    <h1 className="text-2xl text-navBtn">Your Blogs</h1>
                    <p className="text-md">your public as well as private blogs are here</p>
                </div>
                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                    {!loading ?
                    blogs.map((blog, i) => {
                        return <BlogCard key={i} title={blog.title} description={blog.description} id={blog._id} thumbnail={blog.thumbnail} />
                    })
                    :
                    unavailable ?
                    <h1 className="p-10 text-center text-4xl text-navBtn"> Blog not found</h1>
                    :
                    <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
                    }
                </div>
            </div>
        </div>
    )
}
