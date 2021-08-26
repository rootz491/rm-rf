import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useBearer from '../../Hooks/useBearer';
import useUid from '../../Hooks/useUid';
// import { getBearer, getUserId, isAdmin } from '../../user.service';


export default function Actions(props) {
    const history = useHistory();
    const id = props.id;
    const [loading, setLoading] = useState(false);
    const bearer = useBearer();
    const uid = useUid();
    const admin = useAdmin();

    const DeleteHandler = async () => {
        if (!window.confirm("are you sure? There's no coming back!")) {
            setLoading(false);
            return
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/blog/${id}/`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": await bearer
                }
            })
            const data = await res.json();
            if (res.status === 200) {
                console.log(data);
                history.push('/me')
            } 
            else if (res.status === 401 || res.status === 403) {
                alert(data.error);
                setLoading(false);
            }
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
        <div className="m-auto w-full sm:w-1/2 py-2 px-4 lg:w-auto border-4 border-navBtn rounded-md">
            <h1 className="text-navBtn text-center">ACTIONS</h1>
            <div className="flex mt-4 justify-center space-x-4">
                { (uid===props.userId) ?
                <button disabled={loading} onClick={EditHandler} className="px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">edit</button>
                : null }
                { (admin || uid===props.userId) ?
                <button disabled={loading} onClick={DeleteHandler} className="px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">delete</button>
                : null }
                <button disabled={loading} onClick={ShareHandler} className="px-4 py-0.5 w-min text-center bg-navBtn rounded-md text-white border-2 border-navBtn hover:bg-secondaryBg hover:text-navBtn">share</button>
            </div>
        </div>
    )
}
