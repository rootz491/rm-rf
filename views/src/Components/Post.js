import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Post() {
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        
        fetch("/api/post", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                title: e.target.title.value,
                description: e.target.description.value,
                content: e.target.content.value
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .then(history.push('/'));

    }

    return (
        <div className="h-screen bg-primaryBg grid place-content-center">
            <form onSubmit={submitHandler} method="POST" action="/api/post" className="w-full m-auto space-y-4">
                <input className="w-full p-2" type="text" name="title"  placeholder="title" required />
                <textarea className="w-full h-32 p-2" name="description" placeholder="description" required></textarea>
                <textarea className="w-full h-72 p-2" name="content" placeholder="blog goes here" required></textarea>
                <button type="submit" className="w-min px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">post</button>
            </form>
        </div>
    )
}
