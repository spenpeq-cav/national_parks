import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-black p-6 absolute w-full">
            <p className="text-green-600 tracking-widest text-center text-sm t"><Link className="pl-10 text-green-600 uppercase font-bold tracking-wide text-lg" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link> Copyright 2021</p>
        </div>
    )
}

export default Footer