import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    const [mobileMenuHidden, setMobileMenuHidden] = useState(true)
    const toggleMobileMenu = () => {
        setMobileMenuHidden(!mobileMenuHidden)
    }
    

    return (
        <div className="bg-black p-4 items-center">
            <nav className="">
                <Link className="pl-4 text-green-600 uppercase font-bold tracking-wide text-xl" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link>
                <div className="float-right pr-1 divide-x divide-green-400 divide-opacity-75 hidden lg:block">
                    <Link className="px-4 text-yellow-300 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg" to="/login">Log In</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/">Home</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/explore">Explore</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/about">About</Link>
                </div>
                <div className="lg:hidden float-right text-2xl">
                    <button className="items-center" onClick={toggleMobileMenu}><i class="fas fa-bars text-gray-300 h-8 w-8"></i></button>
                </div>
                <div className={mobileMenuHidden ? "hidden" : "lg:hidden"}>
                    <Link className="px-4 py-2 text-yellow-300 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg block mt-2" to="/" onClick={toggleMobileMenu}>Log In</Link>
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/" onClick={toggleMobileMenu}>Home</Link>
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/explore" onClick={toggleMobileMenu}>Explore</Link>
                    <Link className="px-4 py-2 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm block" to="/about" onClick={toggleMobileMenu}>About</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar