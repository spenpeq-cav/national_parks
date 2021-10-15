import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GoogleMaps from '../components/GoogleMaps';
import { Link } from 'react-router-dom'

function ParkScreen({ match }) {
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const parkcode = match.params.parkcode
    
    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode='+ parkcode +'&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    const getData = async() => {
        const res = await axios.get(url)
        const data = res.data.data[0]
        setData(data)
        setLoaded(true)
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(data)
    return (
        <div>
            { loaded ? (
                    <section className="bg-black items-center">
                        <div className="w-full text-center bg-black relative">
                            <img src={data.images[0].url} className="z-1 w-full max-h-96 object-cover opacity-80"/>
                            <h1 className="w-full text-white font-bold tracking-wide text-6xl z-10 top-36 absolute">{data.fullName}</h1>
                            <h2 className="w-full text-white text-xl z-10 top-56 absolute">{data.designation}</h2>
                        </div>
                        <div className="w-full text-center bg-black grid grid-cols-4 gap-4 px-56 py-6">
                            <div>
                                <h1 className="text-white text-lg uppercase">Location</h1>
                                <p className="text-white">Text here</p>
                            </div>
                            <div>
                                <h1 className="text-white text-lg uppercase">Email</h1>
                                <p className="text-white">{data.contacts.emailAddresses[0].emailAddress}</p>
                            </div>
                            <div>
                                <h1 className="text-white text-lg uppercase">Phone</h1>
                                <p className="text-white">{data.contacts.phoneNumbers[0].phoneNumber}</p>
                            </div>
                            <div>
                                <a className="btn btn-secondary transform hover:scale-105 duration-350" href={data.url} target="_blank" rel="noopener noreferrer">Learn More</a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 py-16 px-32 mx-16">
                            <h2 className="text-white text-3xl text-center">Overview</h2>
                            <p className="text-white text-md pr-12">{data.description}</p>
                        </div>
                        <div className="grid grid-cols-2 pb-16 px-32 mx-16">
                            <h2 className="text-white text-3xl  text-center">Climate</h2>
                            <p className="text-white text-md">{data.weatherInfo}</p>
                        </div>

                        <div className="bg-gray-100 py-16">
                            <div className="grid grid-cols-2 py-16 px-32 mx-16 gap-20">
                                <img src={data.images[1].url}/>
                                <div>
                                    <h2 className="text-black text-3xl">Activites</h2>
                                    <h3 className="text-black uppercase py-2">Things to Do</h3>
                                    <p className="text-black text-md py-4 text-sm">
                                        <ui className="grid grid-cols-2 list-none">
                                            {data.activities.map((act) => 
                                            <li key={data.activities.index}>
                                                {act.name}
                                            </li>)}
                                        </ui>
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 py-16 px-32 mx-16 gap-20">
                                <div>
                                    <h2 className="text-black text-3xl">Topics</h2>
                                    <h3 className="text-black uppercase py-2">Things to Learn</h3>
                                    <p className="text-black text-sm py-4">
                                        <ui className="grid grid-cols-2 list-none">
                                            {data.topics.map((act) => 
                                            <li key={data.topics.index}>
                                                {act.name}
                                            </li>)}
                                        </ui>
                                    </p>
                                </div>
                                <img src={data.images[2].url}/>
                            </div>
                        </div>

                        <div className="bg-black py-12 px-48">
                            <h2 className="text-gray-100 text-2xl">Directions</h2>
                            <p className="text-gray-400">{data.directionsInfo}</p>
                            <a href={data.directionsUrl} className="text-gray-100 underline">More information...</a>
                        </div>

                       <GoogleMaps lat={data.latitude} lng={data.longitude} />

                    </section>
                    
                
            ) : <div><h1>Loading ...</h1></div>}
            
            
        </div>
    )
}

export default ParkScreen
