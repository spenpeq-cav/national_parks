import React from 'react'
import { Link } from 'react-router-dom'

import '../components/css/HomeScreen.css';
import PopularParks from '../components/PopularParks'

function HomeScreen() {
    return (
        <section>
            <div className="main-container">
                <h1>All National Parks</h1>
                <p>Explore information on all national parks and services. View activites, ticket fees, parking, and more!</p>
                <Link className="button" to="/explore">Explore Parks</Link>
            </div>
            <div className="popular-container">
                <h1>Popular Parks</h1>
                <PopularParks />
            </div>
        </section>
    )
}

export default HomeScreen