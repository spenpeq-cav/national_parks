import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';

function ExploreScreen() {
  
    const [parkData, setParkData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode=yell&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setParkData(res.data)
                setLoaded(true)})
            .catch(error => console.log(error))
        
        console.log('Fetching data...')
    }, [])

    
  return (
    <div>
        { loaded ? 
            (<div>
                <h1>All National Parks</h1>
                <h2>{parkData[0].fullName}</h2>
                <p>{parkData[0].description}</p>
                <h4>States: {parkData[0].states}</h4>
                <h4>{parkData[0].latLong}</h4>
                <h4>{parkData[0].activities[0].name}</h4>
                <ui>
                    <h4>Activities:</h4>
                    {parkData[0].activities.map((act) => 
                        <li key={parkData[0].activities.index}>
                        {act.name}
                        </li>)
                    }
                </ui>
            </div>)
            : <h2>Loading...</h2> 
        }
      
      <div>
        <ReactJson src={parkData} theme="monokai" collapsed= {true} />
      </div>
    </div>
  );
}

export default ExploreScreen;
