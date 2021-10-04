import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        console.log(loaded)
        console.log(url)
    }, [loaded])

    return (
        <div>
            
            { loaded ? (
                <div>
                    <div class="row">
                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[0].name}</h2>
                                <Link className="button" to={`/explore/${popularParkData[0].parkCode}`}>
                                    <img src={popularParkData[0].images[1].url}/>
                                </Link>   
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[1].name}</h2>
                                <Link className="button" to={`/explore/${popularParkData[1].parkCode}`}>
                                    <img src={popularParkData[1].images[1].url}/>
                                </Link>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[2].name}</h2>
                                <Link className="button" to={`/explore/${popularParkData[2].parkCode}`}>
                                    <img src={popularParkData[2].images[0].url}/>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                ) : <div><h2>Loading...</h2></div>}

                
            

            <div>
                <ReactJson src={popularParkData} theme="monokai" collapsed= {true} />
            </div>

        </div>
    )
}

export default PopularParks
