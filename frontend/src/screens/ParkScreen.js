import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../components/css/ParkScreen.css';

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


    return (
        <div>
            { loaded ? (
                <div className="carousel-container">
                    <Carousel width={650} showArrows={true} selectedItem={0} swipable={true} swipeScrollTolerance={5} swipeScrollTolerance={5} autoPlay={true} infiniteLoop={true} stopOnHover={true} interval={5000} transitionTime={500} dynamicHeight={true}>
                        <div>
                            <img className="carousel-image" src={data.images[0].url} />
                            <p className="legend">{data.images[0].caption}</p>
                        </div>
                        <div>
                            <img src={data.images[1].url} />
                            <p className="legend">{data.images[1].caption}</p>
                        </div>
                        <div>
                            <img src={data.images[2].url} />
                            <p className="legend">{data.images[2].caption}</p>
                        </div>
                    </Carousel>
                </div>
            ) : <div><h1>Loading ...</h1></div>}
            
            
        </div>
    )
}

export default ParkScreen
