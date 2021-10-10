import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className="bg-black p-3">
            <nav className="nav-container">
                <Link className="pl-10 text-green-600 uppercase font-bold tracking-wide text-lg" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link>
                <div className="float-right pr-1 divide-x divide-green-400 divide-opacity-75">
                    <Link className="px-4 text-yellow-300 font-semibold uppercase hover:text-gray-200 tracking-wider text-lg" to="/">Log In</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/">Home</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/explore">Explore</Link>
                    <Link className="px-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/about">About</Link>
                    <Link className="pl-4 text-gray-400 uppercase hover:text-gray-200 tracking-wider text-sm" to="/contact">Contact</Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar