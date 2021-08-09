import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Tags from './PsudoComponents/Tags'
import Actions from './PsudoComponents/Actions'
import { getBearer } from '../user.service'

export default function Blog({ match: { params: { id } } }) {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            const authToken = await getBearer();
            fetch(`/api/blog/${id}`, {
                method: "GET",
                headers: {
                    "authorization": authToken
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlog(data.blog)
                    setLoading(false);
                }
                else {
                    setUnavailable(true);
                }
            });
        }
        fetchBlog();
    }, [id]);

    return (
        <div className="min-h-screen bg-secondaryBg">

            <div className="p-8">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/blogs"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            {
            !loading ?
            <div id="blog" className="lg:flex min-h-screen p-2">

                <div id="main" className="h-auto w-100 lg:w-2/3 py-2 px-4 lg:h-auto min-h-full overflow-hidden">
                    <h1 className="text-2xl min-h-96 text-center underline text-white">{blog.title}</h1>
                    <p className="text-gray-200 border-l-2 my-6 pl-4">
                        {blog.description}
                    </p>
                    <ReactMarkdown plugins={[gfm, rehypeHighlight]} children={blog.content} />
                </div>

                <div id="menu" className="h-auto w-100 lg:h-auto lg:w-1/3 min-h-full mt-8 lg:mt-0 px-6 md:space-y-4 lg:block flex space-x-4">
                    <Tags tags={["design", "old", "retro", "web", "app", "blog"]} />
                    <Actions id={blog._id} />
                </div>
            </div>
            :
            unavailable ?
                <h1 className="p-10 text-center text-4xl text-navBtn"> Blog not found</h1>
                :
                <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
            }
        </div>
    )
}
