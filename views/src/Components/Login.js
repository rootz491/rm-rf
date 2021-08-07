import React from 'react'
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();

    const submitHandler = async e => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            const res =await fetch(e.target.action, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                console.log(data)
                localStorage.setItem('authToken', data.authToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('username', data.username);
                history.push('/');
            }
            else if (res.status === 401) throw "user not found or incorrect password";
            else throw "internal error, please try again later!"
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="min-h-screen  px-4 pb-8  bg-primaryBg grid place-content-center">
            <div className="py-8 px-3 md:px-10">
                <Link className="flex align-middle justify-center rounded-sm w-min px-2 border-2 border-navBtn text-navBtn" to="/"> <div className="w-5 mr-2 my-auto"><img className="w-full" src="/back.png" alt="back" /></div> back</Link>
            </div>
            <form onSubmit={submitHandler} method="POST" action="/auth/login" className="md:w-96 m-auto space-y-4 px-3 md:px-10">
                <h1 className="text-2xl text-navBtn">Login</h1>
                <div>
                    <input className="w-full p-2" type="text" name="username"  placeholder="username" required />
                    <p className="text-xs text-gray-500">username must be unique</p>
                </div>
                <div>
                    <input type="password" className="w-full p-2" name="password" placeholder="password" required />
                    <p className="text-xs text-gray-500">make sure to choose a strong password</p>
                </div>
                <button type="submit" className="w-26 text-center px-3 py-0.5 border-2 border-navBtn rounded-sm hover:bg-navBtn hover:text-white">log in</button>
            </form>
        </div>
    )
}
