import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleMaps from '../components/GoogleMaps';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader"

function ParkScreen({ match }) {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [alreadyAFavorite, setAlreadyAFavorite] = useState(false)
    const [auth, setAuth] = useState(false)
    const parkcode = match.params.parkcode
    
    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode='+ parkcode +'&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    const getData = async() => {
        const res = await axios.get(url)
        const data = res.data.data[0]
        setData(data)
        setLoaded(true)
        console.log("Got data")
    }

    const checkFavorite = async() => {
        const res = await axios.post("/checkFavorite", { parkcode: parkcode})
        const data = res.data
        setAlreadyAFavorite(data.alreadyAFavorite)
        setAuth(true)
        console.log("Checked fav")
    }

    const handleAddOrRemoveFavorite = async() => {
        
        await axios.post("/favoriteAddOrRemove", { parkCode: parkcode, alreadyAFavorite: alreadyAFavorite})
        .then((res) =>{
            console.log("Added")
        })
        .catch((err) =>{
            console.log(err)
        })
        
    }

    useEffect(() => {
        getData()
        if(loaded){
            checkFavorite()
        }
    }, [loaded])

    return (
        <div>
            { loaded ? (
                    <section className="bg-black items-center">

                        <div className="w-full text-center bg-black relative">
                            <img src={data.images[0].url} className="z-1 w-full max-h-screen object-cover opacity-80"/>
                            <div className="absolute m-auto z-10 w-full text-white text-center top-16 sm:top-24 lg:top-44 xl:top-64 2xl:top-80">
                                <h1 className="font-bold tracking-wide text-3xl sm:text-5xl md:text-6xl xl:text-7xl px-36 md:px-40">{data.fullName}</h1>
                                <h2 className="text-md sm:text-lg md:text-xl xl:text-2xl pt-3">{data.designation}</h2>
                            </div>
                        </div>

                        <div className="w-full lg:text-center bg-black px-16 py-6 md:grid md:grid-cols-2 lg:grid-cols-5 lg:gap-4 2xl:px-56 lg:py-6">
                            <div className="py-2 text-center">
                                { alreadyAFavorite ? (
                                    <div>
                                        <Link to="/profile" className="bg-yellow-100 btn border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full transform hover:scale-105 duration-500 py-3 w-24 h-full text-center text-3xl"><i class="fas fa-star"></i></Link>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full transform hover:scale-105 duration-500 py-3 w-24 h-full text-center text-3xl" onClick={() => handleAddOrRemoveFavorite()}><i class="far fa-star"></i></button>
                                        <p className="text-yellow-400 font-medium text-sm">Add Favorite</p>
                                    </div>
                                )
                            }
                                
                            </div>
                            <div className="py-2">
                                <h1 className="text-white text-lg uppercase font-bold">Location</h1>
                                <p className="text-white">{data.addresses[0].city}, {data.addresses[0].stateCode}</p>
                            </div>
                            <div className="py-2">
                                <h1 className="text-white text-lg uppercase font-bold">Email</h1>
                                <p className="text-white">{data.contacts.emailAddresses[0].emailAddress}</p>
                            </div>
                            <div className="py-2">
                                <h1 className="text-white text-lg uppercase font-bold">Phone</h1>
                                <p className="text-white">{data.contacts.phoneNumbers[0].phoneNumber}</p>
                            </div>
                            <div className="py-2">
                                <a className="btn btn-gray transform hover:scale-105 duration-350 py-3 w-full text-center" href={data.url} target="_blank" rel="noopener noreferrer">Learn More</a>
                            </div>
                        </div>

                        <div className="lg:grid lg:grid-cols-3 px-6 py-12 lg:pt-24 2xl:py-16 2xl:px-32 2xl:mx-16">
                            <h2 className="text-white text-4xl lg:text-center pb-4 lg:col-span-1">Overview</h2>
                            <p className="text-white text-lg 2xl:pr-12 lg:col-span-2">{data.description}</p>
                        </div>
                        <div className="lg:grid lg:grid-cols-3 px-6 py-12 lg:pb-24 2xl:py-16 2xl:px-32 2xl:mx-16">
                            <h2 className="text-white text-4xl lg:text-center pb-4 lg:col-span-1">Climate</h2>
                            <p className="text-white text-lg lg:col-span-2">{data.weatherInfo}</p>
                        </div>

                        <div className="bg-gray-200 xl:py-16">
                            <div className="lg:grid lg:grid-cols-2 xl:py-4 xl:px-24 xl:gap-10">
                                <img src={data.images[1].url}/>
                                <div className="py-2 px-4 pt-12 md:px-12">
                                    <h2 className="text-black text-4xl font-semibold">Activites</h2>
                                    <h3 className="text-black uppercase py-2 font-semibold">Things to Do</h3>
                                    <p className="text-black text-md py-4 text-md">
                                        <ui className="grid grid-cols-2 list-none">
                                            {data.activities.map((act) => 
                                            <li key={data.activities.index}>
                                                - {act.name}
                                            </li>)}
                                        </ui>
                                    </p>
                                </div>
                            </div>
                            <div className="lg:grid lg:grid-cols-2 xl:py-4 xl:px-24 xl:gap-10 mt-16">
                                <div className="py-2 px-4 md:px-12">
                                    <h2 className="text-black text-4xl font-semibold">Topics</h2>
                                    <h3 className="text-black uppercase py-2 font-semibold">Things to Learn</h3>
                                    <p className="text-black text-md py-4">
                                        <ui className="grid grid-cols-2 list-none">
                                            {data.topics.map((act) => 
                                            <li key={data.topics.index}>
                                                - {act.name}
                                            </li>)}
                                        </ui>
                                    </p>
                                </div>
                                
                                { data.images.length > 2 ? <><img src={data.images[2].url}/></>
                                    : <><img src={data.images[1].url} /></> }
                                
                            </div>
                        </div>

                        <div className="bg-black p-8 md:p-12 lg:py-12 lg:px-48 xl:px-64">
                            <h2 className="text-gray-100 text-4xl py-2">Directions</h2>
                            <p className="text-gray-400 text-lg py-2">{data.directionsInfo}</p>
                            <a href={data.directionsUrl} className="text-gray-100 underline py-2">More information...</a>
                        </div>

                       <GoogleMaps lat={data.latitude} lng={data.longitude} />

                    </section>
                    
                
            ) : <div>
                    <div className="text-center bg-black h-screen pt-48">
                        <ClipLoader color={"white"} size={150}/>
                    </div>
                </div>}
            
            
        </div>
    )
}

export default ParkScreen
