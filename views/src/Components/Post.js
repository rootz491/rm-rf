import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { getBearer } from '../user.service';

export default function Post() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(`https://via.placeholder.com/600x150?text=edit this`);
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);

    const submitHandler = async e => {
        e.preventDefault();
        setLoading(true);
        const authToken = await getBearer();
        
        fetch("/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": authToken
            },
            body: JSON.stringify({
                title,
                description,
                content,
                isPublic,
                thumbnail
            })
        }).then(res => res.json())
        .then(data => {
            if (data.success) {
                const id = data.blog[0]._id;
                history.push(`/blog/${id}`);
            }
            else {
                alert(data.error);
            }
        })

    }

    return (
        <div className="min-h-screen  px-4 pb-8  bg-primaryBg grid place-content-center">
            <div className="py-8 px-3 md:px-10">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/blogs"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            <form onSubmit={submitHandler} method="POST" action="/api/post" className="w-screen px-3 md:px-10 m-auto space-y-4">
                <img className="w-full" src={thumbnail} alt="thumbnail" />
                <h1 className="text-3xl text-navBtn">Post</h1>
                <input  value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2" type="text" name="title"  placeholder="title" required />
                <div>
                    <input placeholder="thumbnail image" type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full p-2" />
                    <p className="text-xs text-gray-500">URL to thumbnail image for your blog</p>
                </div>
                <div className="w-56 flex justify-between align-baseline">
                    <label htmlFor="isPublic">publicily visible</label>
                    <input id="isPublic" type="checkbox" defaultChecked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                </div>
                <div>
                    <textarea  value={description} onChange={e => setDescription(e.target.value)} className="w-full h-32 p-2" name="description" placeholder="description" required></textarea>
                    <p className="text-xs text-gray-500">Doesn't support markdown</p>
                </div>
                <div>
                    <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full h-72 p-2" name="content" placeholder="blog goes here" required></textarea>
                    <p className="text-xs text-gray-500">This section support some elements of markdown.</p>
                </div>
                <button disabled={loading} type="submit" className="w-min px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">post</button>
            </form>
        </div>
    )
}
