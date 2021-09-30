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

    console.log(data)
    return (
        <div>
            { loaded ? (
                    <div className="row">
                        <div className="column">
                            <Carousel width={650} showArrows={true} selectedItem={0} swipable={true} swipeScrollTolerance={5} swipeScrollTolerance={5} autoPlay={true} infiniteLoop={true} stopOnHover={true} interval={5000} transitionTime={500} dynamicHeight={false}>
                                {data.images.map((img) => 
                                    <div key={data.topics.index}>
                                        <img src={img.url} />
                                        <p className="legend">{img.caption}</p>
                                    </div>)}
                            </Carousel>
                        </div>
                        <div className="column info-column">
                            <div className="info-box">
                                <h2>{data.fullName}</h2>
                                <p>{data.description}</p>
                                <p>Located in the state(s): {data.states}</p>
                                <p>{data.directionsInfo}</p>
                            </div>
                            <div className="info-box">
                                <h3>Activities</h3>
                                <ui>
                                    {data.activities.map((act) => 
                                    <li key={data.activities.index}>
                                        {act.name}
                                    </li>)}
                                </ui>
                            </div>
                            <div className="info-box">
                                <h3>Topics</h3>
                                <ui>
                                    {data.topics.map((act) => 
                                    <li key={data.topics.index}>
                                        {act.name}
                                    </li>)}
                                </ui>
                            </div>
                            <div className="info-box">
                                <h3><i class="fas fa-phone-square-alt"></i> Contact</h3>
                                <p>{data.contacts.emailAddresses[0].description}</p>
                                <p><b>Email:</b> {data.contacts.emailAddresses[0].emailAddress}</p>
                                <p><b>Phone Number:</b> {data.contacts.phoneNumbers[0].phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    
                
            ) : <div><h1>Loading ...</h1></div>}
            
            
        </div>
    )
}

export default ParkScreen
