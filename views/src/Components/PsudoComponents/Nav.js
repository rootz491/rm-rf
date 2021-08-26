import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';
import useReset from '../../Hooks/useReset';
// import { isAuthenticated, reset, isAdmin } from '../../user.service';

export default function Nav() {
    const history = useHistory();
    const btns = useRef();
    const check = useRef();
    const admin = useAdmin();
    const auth = useAuth();

    const MenuToggle = (e) => {
        if (e.target.checked)   btns.current.className = btns.current.className.replace("hidden", "grid");
        else    btns.current.className = (btns.current.className.replace("grid", "hidden"));
    }

    const LogoutHandler = async () => {
        console.log('adios')
        useReset();
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
                    auth ?
                    <>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/me">profile</Link>
                        <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/post">post</Link>
                        {admin ? <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/admin">admin</Link> : null}
                    </> :
                    null
                }
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/about">about</Link>
                {
                    auth ?
                    <button onClick={LogoutHandler} className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1">logout</button> 
                    :
                    <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/login">login</Link>
                }
            </div>
        </div>
    )
}
