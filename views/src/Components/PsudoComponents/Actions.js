import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Actions(props) {
    const history = useHistory();
    const id = props.id;
    const [loading, setLoading] = useState(false);

    const DeleteHandler = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/blog/${id}/`, {
                method: "DELETE"
            })
            const data = await res.json();
            console.log(data);
            setLoading(false);
            history.push('/blogs')

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const EditHandler = () => {
        history.push(`/blog/${id}/edit`);
    }

    const ShareHandler = () => {
        alert('feature not available yet');
    }

    return (
        <div className="lg:sticky lg:top-56 mx-auto md:mx-0 w-1/2 py-2 px-4 lg:w-auto border-4 border-navBtn rounded-md">
            <h1 className="text-navBtn text-center md:text-left">ACTIONS</h1>
            <div className="grid gap-4 place-content-center md:place-content-start m-auto md:flex mt-4">
                <button disabled={loading} onClick={EditHandler} className="m-auto px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">edit</button>
                <button disabled={loading} onClick={DeleteHandler} className="m-auto px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">delete</button>
                <button disabled={loading} onClick={ShareHandler} className="m-auto px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">share</button>
            </div>
        </div>
    )
}
