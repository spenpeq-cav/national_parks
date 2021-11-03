import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-black p-6 absolute w-full">
            <div className="flex flex-col px-12 py-4 w-full lg:px-48 xl:px-64">
                <div className="flex-auto text-center">
                    <Link className="text-green-600 uppercase font-bold tracking-wide text-xl" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link>
                    <p className="text-green-600 tracking-widest text-center text-sm t"> Copyright 2021</p>
                </div>
                <div className="flex-auto 2xl:mr-24 text-left py-6 max-w-md">
                    <p className="text-gray-300">Made possible by the</p>
                    <a href="https://www.nps.gov/subjects/developer/api-documentation.htm" className="underline text-gray-300">National Park Service API</a>
                </div>
                <p className="flex-auto text-gray-300">For more information about national parks, upcoming park events, anniversaries, and awards, view the <a href="https://www.nps.gov/index.htm" className="underline">National Park Service website</a>.</p>
            </div>
            
        </div>
    )
}

export default Footer