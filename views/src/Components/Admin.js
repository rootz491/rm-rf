import React, { useState, useEffect } from 'react'
import { getBearer } from '../user.service';
import BlogCard from './PsudoComponents/UserCard';
import Nav from './PsudoComponents/Nav';


export default function Admin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(()=> {
        const fetchUsers = async () => {
            const res = await fetch('/auth/users', {
                headers: {
                    "authorization": await getBearer()
                }
            })
            const data = await res.json();
            if (res.status === 200) {
                if (data.success) {
                    if (data.users.length > 0) {
                        setUsers(data.users);
                        setLoading(false)
                    }
                    else setUnavailable(true)
                }
                else {
                    setUnavailable(true);
                    alert(data.error)
                }
            }
            else {
                console.log(data);
                alert(data.error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen w-screen bg-primaryBg pb-24 md:pb-0">
            <Nav />
            <div className="grid place-content-center sm:my-16 md:my-0">
                <div className="my-6 px-4">
                    <h1 className="text-2xl text-navBtn">List of all Users</h1>
                    <p className="text-md">you can visit each user's profile and view their public or private posts.</p>
                </div>
                <div className="grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 md:align-middle lg:gap-5">
                    {!loading ?
                    users.map((user, i) => {
                        return <BlogCard key={i} username={user.username} role={user.role} id={user._id} thumbnail={`https://via.placeholder.com/600x200?text=${user.username}`} />
                    })
                    :
                    unavailable ?
                    <h1 className="p-10 text-center text-4xl text-navBtn">no users found</h1>
                    :
                    <h1 className="p-10 text-center text-4xl text-navBtn">Loading, Please wait!</h1>
                    }
                </div>
            </div>
        </div>
    )
}
