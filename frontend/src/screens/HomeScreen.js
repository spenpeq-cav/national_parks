import React from 'react'
import { Link } from 'react-router-dom'

import PopularParks from '../components/PopularParks'

function HomeScreen() {
    return (
        <section className="bg-home-image bg-cover bg-center p-5">
            <div className="pt-20 max-w-xl mx-auto text-center">
                <h1 className="mt-6 text-6xl font-bold text-gray-900">Explore America's National Parks</h1>
                <p className="mt-6 text-gray-900">Explore information on all national parks and services. View activites, ticket fees, parking, and more! Log in to save your favorite parks.</p>
                <div className="mt-6 space-x-3 ">
                    <Link className="btn btn-primary transform hover:scale-105 duration-350" to="/explore">Explore Parks</Link>
                    <Link className="btn btn-secondary" to="/">Log In</Link>
                </div>
            </div>
            <div className="my-4">
                <PopularParks />
            </div>
        </section>
    )
}

export default HomeScreen