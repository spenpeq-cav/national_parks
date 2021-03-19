import React from 'react'
import { Link } from 'react-router-dom'

import '../components/css/HomeScreen.css';
import PopularParks from '../components/PopularParks'

function HomeScreen() {
    return (
        <section>
            <div className="main-container">
                <img src="https://sgl-assets.imgix.net/files/article_hero/top-things-do-yosemite-national-park-via-magazine-shutterstock_758607316.jpg?h=61ce19a1&itok=bX4XJbAO?w=1200h=630&crop=faces,edges"></img>
                <h1>All National Parks</h1>
                <p>Explore information on all national parks. View activites, parking, and more!</p>
                <Link className="button" to="/explore">Explore Parks</Link>
            </div>
            <div className="popular-container">
                <PopularParks />
            </div>
        </section>
    )
}

export default HomeScreen