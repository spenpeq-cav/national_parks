import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';
import axios from 'axios';

import ClipLoader from "react-spinners/ClipLoader"

function PopularParks() {

    const [popularParkData, setPopularParkData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const popularParkCodes = ['grsm','grca','yose','romo','zion','yell']

    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode='+ popularParkCodes +'&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    const url1 = 'https://developer.nps.gov/api/v1/parks?parkCode='+ popularParkCodes[2] +'&api_key=' + process.env.REACT_APP_API_KEY
    const url2 = 'https://developer.nps.gov/api/v1/parks?parkCode='+ popularParkCodes[4] +'&api_key=' + process.env.REACT_APP_API_KEY
    const url3 = 'https://developer.nps.gov/api/v1/parks?parkCode='+ popularParkCodes[5] +'&api_key=' + process.env.REACT_APP_API_KEY

    const getPopularData = async() => {
        const dataArray = []
        const res1 = await axios.get(url1)
        const data1 = res1.data.data[0]
        dataArray.push(data1)
        const res2 = await axios.get(url2)
        const data2 = res2.data.data[0]
        dataArray.push(data2)
        const res3 = await axios.get(url3)
        const data3 = res3.data.data[0]
        dataArray.push(data3)

        setPopularParkData(dataArray)
        setLoaded(true)
    }

    useEffect(() => {
        getPopularData()
    }, [loaded])

    return (
        <div>
            
            { loaded ? (
                <div className="grid grid-cols-3 gap-4">
                   <div className="my-5 py-16 px-12 w-full relative">
                        <Link className="" to={`/explore/${popularParkData[0].parkCode}`}>
                            <div className="group">
                                <img className="popular-home-card" src={popularParkData[0].images[0].url}/>
                                <div className="popular-home-card-text">{popularParkData[0].name}</div>
                            </div>
                        </Link>   
                    </div>
                    <div className="my-5 py-16 px-12 w-full relative">
                        <Link className="" to={`/explore/${popularParkData[1].parkCode}`}>
                            <div className="group h-full">
                                <img className="popular-home-card h-full" src={popularParkData[1].images[4].url}/>
                                <div className="popular-home-card-text">{popularParkData[1].name}</div>
                            </div>
                        </Link>   
                    </div>
                    <div className="my-5 py-16 px-12 w-full relative">
                        <Link className="" to={`/explore/${popularParkData[2].parkCode}`}>
                            <div className="group h-full">
                                <img className="popular-home-card h-full" src={popularParkData[2].images[0].url}/>
                                <div className="popular-home-card-text">{popularParkData[2].name}</div>
                            </div>
                        </Link>   
                    </div>
                </div>
                ) : 
                    <div className="grid grid-cols-3 gap-4">
                        <div className="my-5 py-16 px-12 w-full relative">
                            <div className="text-center p-24">
                                <ClipLoader color={"white"} size={150} />
                            </div>
                        </div>
                        <div className="my-5 py-16 px-12 w-full relative">
                            <div className="text-center p-24">
                                <ClipLoader color={"white"} size={150} />
                            </div>
                        </div>
                        <div className="my-5 py-16 px-12 w-full relative">
                            <div className="text-center p-24">
                                <ClipLoader color={"white"} size={150} />
                            </div>
                        </div>
                    </div>
                    }

        </div>
    )
}

export default PopularParks
