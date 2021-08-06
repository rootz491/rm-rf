import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    const btns = useRef();
    const check = useRef();

    const MenuToggle = (e) => {
        if (e.target.checked) 
            btns.current.className = btns.current.className.replace("hidden", "grid");
        else
            btns.current.className = (btns.current.className.replace("grid", "hidden"));
        
    }

    return (
        <div className="py-6 px-8 flex justify-between bg-primaryBg md:bg-transparent">
            <Link className="h-min w-navBtn text-center bg-navBtn shadow-nav px-5 rounded-sm text-white py-1" to="/">home</Link>
            <input id="menu" name="menu" ref={check} onChange={MenuToggle} type="checkbox" hidden />
            <label className="block md:hidden z-10" htmlFor="menu">🌟</label>
            <div ref={btns} className="absolute w-screen left-0 top-30 hidden gap-4 place-content-center md:static md:flex md:space-x-2 lg:space-x-8 bg-primaryBg md:bg-transparent">
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/post">post</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/">gallery</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/blogs">blogs</Link>
                <Link className="w-navBtn text-center bg-navBtn shadow-nav rounded-sm text-white py-1" to="/">about</Link>
            </div>
        </div>
    )
}
