import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, reset, isAdmin } from '../../user.service';

export default function Nav() {
    const history = useHistory();
    const btns = useRef();
    const check = useRef();

    const MenuToggle = (e) => {
        if (e.target.checked)   btns.current.className = btns.current.className.replace("hidden", "grid");
        else    btns.current.className = (btns.current.className.replace("grid", "hidden"));
    }

    const LogoutHandler = async () => {
        reset();
        history.push('/login');
    }

    return (
        <div className="py-6 px-8 flex justify-between bg-primaryBg md:bg-transparent">
            {/* <Link className="h-min w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">home</Link> */}
            <input id="menu" name="menu" ref={check} onChange={MenuToggle} type="checkbox" hidden />
            <label className="block lg:hidden z-10" htmlFor="menu">🌟</label>
            <div ref={btns} className="absolute w-screen left-0 top-30 hidden gap-4 place-content-center pb-4 shadow-lg lg:shadow-none md:pb-0 lg:static lg:flex md:space-x-2 lg:space-x-8 bg-primaryBg lg:bg-transparent">
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/">home</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/blogs">blogs</Link>
                {
                    isAuthenticated() ?
                    <>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/me">profile</Link>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/post">post</Link>
                        {isAdmin() ? <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/admin">admin</Link> : null}
                    </> :
                    null
                }
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/about">about</Link>
                {
                    isAuthenticated() ?
                    <button onClick={LogoutHandler} className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1">logout</button> 
                    :
                    <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/login">login</Link>
                }
            </div>
        </div>
    )
}
