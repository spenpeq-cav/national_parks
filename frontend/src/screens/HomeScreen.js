import React from 'react'
import PopularParks from '../components/PopularParks'

function HomeScreen() {
    return (
        <div>
            <h1>All National Parks</h1>
            <button>Explore</button>
            <PopularParks />
        </div>
    )
}

export default HomeScreen