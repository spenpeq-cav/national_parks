import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ClipLoader from "react-spinners/ClipLoader"

function PopularParks() {

    const [popularParkData, setPopularParkData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const popularParkCodes = 'yose,grca,yell'

    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode='+ popularParkCodes +'&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    const getPopularData = async() => {
        const res = await axios.get(url)
        const data = res.data.data
        setPopularParkData(data)
        setLoaded(true)
        console.log(popularParkData)
    }

    useEffect(() => {
        getPopularData()
    }, [loaded])

    return (
        <div>
            
            { loaded ? (
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4">
                   <div className="md:px-16 lg:px-2 w-full relative p-2">
                        <Link className="" to={`/explore/${popularParkData[2].parkCode}`}>
                            <div className="group">
                                <img className="popular-home-card" src={popularParkData[2].images[0].url}/>
                                <div className="popular-home-card-text top-2 right-6 md:right-20 lg:right-6">{popularParkData[2].name}</div>
                            </div>
                        </Link>   
                    </div>
                    <div className="md:px-16 lg:px-2 w-full relative p-2">
                        <Link className="" to={`/explore/${popularParkData[0].parkCode}`}>
                            <div className="group h-full">
                                <img className="popular-home-card h-full" src={popularParkData[0].images[1].url}/>
                                <div className="popular-home-card-text top-2 right-6 md:right-20 lg:right-6">{popularParkData[0].name}</div>
                            </div>
                        </Link>   
                    </div>
                    <div className="md:px-16 lg:px-2 w-full relative p-2">
                        <Link className="" to={`/explore/${popularParkData[1].parkCode}`}>
                            <div className="group h-full">
                                <img className="popular-home-card h-full" src={popularParkData[1].images[0].url}/>
                                <div className="popular-home-card-text top-2 right-6 md:right-20 lg:right-6">{popularParkData[1].name}</div>
                            </div>
                        </Link>   
                    </div>
                </div>
                ) : 
                    <div className="text-center">
                        <div className="2xl:pb-52 2xl:px-12 w-full relative">
                            <div className="text-center p-16">
                                <ClipLoader color={"white"} size={150} />
                            </div>
                        </div>
                    </div>
                    }

        </div>
    )
}

export default PopularParks
