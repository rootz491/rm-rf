import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { getBearer } from '../user.service';

export default function Edit({ match: { params: { id } } }) {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
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
                    setLoading(false);
                    setTitle(data.blog.title);
                    setDescription(data.blog.description);
                    setContent(data.blog.content);
                }
                else {
                    setUnavailable(true);
                }
            });
        }
        fetchBlog();
    }, [id])

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const authToken = await getBearer();
            let res = await fetch(`/api/blog/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": authToken
                },
                body: JSON.stringify({
                    title,
                    description,
                    content
                })
            });
            let data = await res.json();
            if (res.status === 200) {
                history.push(`/blog/${id}`)
            }
            else if (res.status === 401 || res.status === 403) {
                alert(data.error)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen px-4 pb-8 bg-primaryBg grid place-content-center">
            <div className="py-8 px-3 md:px-10">
                <Link aria-disabled={loading} className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to={unavailable?"/":`/blog/${id}`}> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            {
            !loading ?
            <form onSubmit={submitHandler} method="POST" action="/api/post" className="w-screen px-3 md:px-10 m-auto space-y-4">
                <h1 className="text-3xl text-navBtn">Edit</h1>
                <input  value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2" type="text" name="title"  placeholder="title" required />
                <div>
                    <textarea  value={description} onChange={e => setDescription(e.target.value)} className="w-full h-32 p-2" name="description" placeholder="description" required></textarea>
                    <p className="text-xs text-gray-500">Doesn't support markdown</p>
                </div>
                <div>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-72 p-2" name="content" placeholder="blog goes here" required></textarea>
                    <p className="text-xs text-gray-500">This section support some elements of markdown.</p>
                </div>
                <button type="submit" className="w-min px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">update</button>
            </form>
            :
                unavailable ?
                <h1 className="p-10 text-center text-4xl text-navBtn"> Blog not found</h1>
                :
                <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
            }
        </div>
    )
}
