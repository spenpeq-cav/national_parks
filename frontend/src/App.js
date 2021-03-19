import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';

function App() {
  
  const [parkData, setParkData] = useState([])
  const [loaded, setLoaded] = useState(false)

  function getData() {
    const base_url = 'https://developer.nps.gov/api/v1'
    const endpoint_url = '/parks?parkCode=yell&api_key=' + process.env.REACT_APP_API_KEY
    const url = base_url + endpoint_url

    fetch(url)
      .then(res => res.json())
      .then(json => setParkData(json))
      .catch(error =>{console.log(error)})
  }

  useEffect(() => {
    setLoaded(true)
    getData()
  }, [])

  return (
    <div className="App">
      <div>
        <h1>All National Parks</h1>
        <h2>{parkData.data[0].fullName}</h2>
        <p>{parkData.data[0].description}</p>
        <h4>States: {parkData.data[0].states}</h4>
        <h4>{parkData.data[0].latLong}</h4>
        <h4>{parkData.data[0].activities[0].name}</h4>
        <ui>
          <h4>Activities:</h4>
          {parkData.data[0].activities.map((act) => 
            <li key={parkData.data[0].activities.index}>
              {act.name}
            </li>)
          }
        </ui>
        
      </div>
      
      
      
      <div>
        <ReactJson src={parkData} theme="monokai" collapsed= {true} />
      </div>
    </div>
  );
}

export default App;
