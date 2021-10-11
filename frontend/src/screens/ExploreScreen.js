import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../components/css/ExploreScreen.css';

function ExploreScreen() {
  const [data, setData] = useState([])
  const [state, setState] = useState("")
  const [filterNPOnly, setFilterNPOnly] = useState(false)

  const stateCodes = [
    { code: 'AL', name: "Alabama"},{ code: 'AK', name: "Alaska"},{ code: 'AZ', name: "Arizona"},{ code: 'AR', name: "Arkansas"},
    { code: 'CA', name: "California"},{ code: 'CO', name: "Colorado"},{ code: 'CT', name: "Connecticut"},{ code: 'DE', name: "Delaware"},
    { code: 'DC', name: "District Of Columbia"},{ code: 'FL', name: "Florida"},{ code: 'GA', name: "Georgia"},{ code: 'HI', name: "Hawaii"},
    { code: 'ID', name: "Idaho"},{ code: 'IL', name: "Illinois"},{ code: 'IN', name: "Indiana"},{ code: 'IA', name: "Iowa"},{ code: 'KS', name: "Kansas"},
    { code: 'KY', name: "Kentucky"},{ code: 'LA', name: "Louisiana"},{ code: 'ME', name: "Maine"},{ code: 'MD', name: "Maryland"},
    { code: 'MA', name: "Massachusetts"},{ code: 'MI', name: "Michigan"},{ code: 'MS', name: "Minnesota"},{ code: 'MO', name: "Missouri"},
    { code: 'MT', name: "Montana"},{ code: 'NE', name: "Nebraska"},{ code: 'NV', name: "Nevada"},{ code: 'NH', name: "New Hampshire"},
    { code: 'NJ', name: "New Jersey"},{ code: 'NM', name: "New Mexico"},{ code: 'NY', name: "New York"},{ code: 'NC', name: "North Carolina"},
    { code: 'ND', name: "North Dakota"},{ code: 'OH', name: "Ohio"},{ code: 'OK', name: "Oklahoma"},{ code: 'OR', name: "Oregon"},{ code: 'PA', name: "Pennsylvania"},
    { code: 'RI', name: "Rhode Island"},{ code: 'SC', name: "South Carolina"},{ code: 'SD', name: "South Dakota"},{ code: 'TN', name: "Tennessee"},{ code: 'TX', name: "Texas"},
    { code: 'UT', name: "Utah"},{ code: 'VT', name: "Vermont"},{ code: 'VA', name: "Virginia"},{ code: 'WA', name: "Washington"},
    { code: 'WV', name: "West Virginia"},{ code: 'WI', name: "Wisconsin"},{ code: 'WY', name: "Wyoming"},
  ]
  

  const base_url = 'https://developer.nps.gov/api/v1'
  // var endpoint_url = '/parks?limit=600&api_key=' + process.env.REACT_APP_API_KEY
  // var url = base_url + endpoint_url
  var endpoint_url = '/parks?stateCode='+ state +'&api_key=' + process.env.REACT_APP_API_KEY
  var url = base_url + endpoint_url

  const getData = async() => {
    if(filterNPOnly){
      endpoint_url = '/parks?stateCode='+ state +'&api_key=' + process.env.REACT_APP_API_KEY
      url = base_url + endpoint_url
    }
    const res = await axios.get(url)
    const data = res.data.data
    setData(data)
    console.log(data)
  }

  
  return (
    <section className="bg-explore-image bg-cover p-5">
      <div className="py-28 max-w-xl mx-auto text-center">
          <h1 className="mt-6 text-6xl font-bold text-gray-900">Explore Parks</h1>
      </div>
      
      <div className="bg-white shadow p-4 flex mx-64 mb-20">
        <select className="border border-6 border-solid border-black" onChange={(e) => {
          const selectedState = e.target.value
          setState(selectedState)
        }}>
          <option value="">  Select State</option>
          { stateCodes.map((state) => (
            <option value={state.code}>{state.name}</option>
          ))}
        </select>
        <span className="w-auto flex justify-end items-center text-gray-500 p-2">
          <i className="fas fa-search"></i>
        </span>
        <input className="w-full rounded p-2" type="text" placeholder="Search..." />
        <button className="bg-green-500 hover:bg-green-400 rounded text-black p-2 pl-4 pr-4" onClick={() => getData()}>
          <p className="font-semibold text-xs"><i className="fas fa-search"></i>Search</p>
        </button>
      </div>
    </section>
  );
}

export default ExploreScreen;
