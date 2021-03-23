import React, {useState, useEffect} from 'react';
import ReactJson from 'react-json-view';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../components/css/ExploreScreen.css';

function ExploreScreen() {
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(10)
  const [pageCount, setPageCount] = useState(0)

  const base_url = 'https://developer.nps.gov/api/v1'
  const endpoint_url = '/parks?limit=600&api_key=' + process.env.REACT_APP_API_KEY
  const url = base_url + endpoint_url

  const getData = async() => {
    const res = await axios.get(url)
    const data = res.data.data
    console.log(data)
    const slice = data.slice(offset, offset+perPage)
    const postData = slice.map(park => 
      <div key={park.id}>
        <p>{park.fullName}</p>
      </div>)
    setData(postData)
    setPageCount(Math.ceil(data.length / perPage))
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    if(selectedPage === 0){
      setOffset(0)
    }
    else{
      setOffset(selectedPage * perPage)
    } 
  }

  useEffect(() => {
    getData()
  }, [offset])

  

    // useEffect(() => {
    //     fetch(url)
    //         .then(res => res.json())
    //         .then(res => {
    //             setParkData(res.data)
    //             setLoaded(true)})
    //         .catch(error => console.log(error))
        
    //     console.log('Fetching data...')
    // }, [])

    
  return (
    <div>
        {/* { loaded ? 
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
        } */}
      
        
      {data}
        
      
      
      
      <ReactPaginate 
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"} />

    </div>
  );
}

export default ExploreScreen;
