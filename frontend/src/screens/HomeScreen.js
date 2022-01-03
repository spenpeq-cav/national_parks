import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import PopularParks from '../components/PopularParks'
import { UserContext } from '../context/UserContext'

function HomeScreen() {
    const { user } = useContext(UserContext);
    
    return (
        <section className="bg-gradient p-5">
            <div className="pt-10 max-w-xl mx-auto text-center">
                <h1 className="mt-6 text-6xl font-bold text-gray-900">Explore America's National Parks</h1>
                <p className="mt-6 text-gray-900">Explore information on all national parks and services. View activites, ticket fees, parking, and more! Log in to save your favorite parks.</p>
                <div className="mt-6 space-x-3 ">
                    <Link className="btn btn-primary px-6 py-4 xl:px-8 xl:py-6 font-bold" to="/explore">Explore Parks</Link>
                    { user ? <Link className="btn btn-secondary px-6 py-4 xl:px-8 xl:py-6 font-bold" to="/profile">My Profile</Link>
                        : <Link className="btn btn-secondary px-6 py-4 xl:px-8 xl:py-6 font-bold" to="/login">Log In</Link>
                    }
                </div>
            </div>
            <div className="my-4 py-6">
                <PopularParks />
            </div>  
        </section>
    )
}

export default HomeScreen