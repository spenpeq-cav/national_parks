import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="bg-black p-6 absolute w-full">
            <div className="flex flex-row px-48 py-4 mx-24 w-full">
                <div className="flex-auto text-center">
                    <Link className="pl-10 text-green-600 uppercase font-bold tracking-wide text-sm" to="/"><i className="fas fa-mountain pr-1"></i> National Parks</Link>
                    <p className="text-green-600 tracking-widest text-center text-sm t"> Copyright 2021</p>
                </div>
                <div className="flex-auto mr-24 text-right">
                    <p className="text-gray-50">Made possible by the</p>
                    <a href="https://www.nps.gov/subjects/developer/api-documentation.htm" className="underline text-gray-50">National Park Service API</a>
                </div>
                <p className="flex-auto text-gray-50">For more information about national parks, upcoming park events, anniversaries, and awards, view the <a href="https://www.nps.gov/index.htm" className="underline">National Park Service website</a>.</p>
            </div>
            
        </div>
    )
}

export default Footer