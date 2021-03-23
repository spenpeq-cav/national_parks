import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import { Link } from 'react-router-dom'

function PopularParks() {

    const [popularParkData, setPopularParkData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const popularParkCodes = 'grsm,grca,yose,romo,zion,yell'

    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode='+ popularParkCodes +'&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setPopularParkData(res.data)
                setLoaded(true)})
            .catch(error => console.log(error))
    }, [])
    return (
        <div>
            
            { loaded ? (
                <div>
                    <div class="row">
                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[0].name}</h2>
                                <img src={popularParkData[0].images[1].url}/>
                                <p>{popularParkData[0].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[0].parkCode}`}>View More Info</Link>   
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[1].name}</h2>
                                <img src={popularParkData[1].images[1].url}/>
                                <p>{popularParkData[1].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[1].parkCode}`}>View More Info</Link>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[2].name}</h2>
                                <img src={popularParkData[2].images[0].url}/>
                                <p>{popularParkData[2].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[2].parkCode}`}>View More Info</Link>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[3].name}</h2>
                                <img src={popularParkData[3].images[2].url}/>
                                <p>{popularParkData[3].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[3].parkCode}`}>View More Info</Link>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[4].name}</h2>
                                <img src={popularParkData[4].images[3].url}/>
                                <p>{popularParkData[4].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[4].parkCode}`}>View More Info</Link>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card">
                                <h2>{popularParkData[5].name}</h2>
                                <img src={popularParkData[5].images[4].url}/>
                                <p>{popularParkData[5].description}</p>
                                <Link className="button" to={`/explore/${popularParkData[5].parkCode}`}>View More Info</Link>
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
