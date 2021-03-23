import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../components/css/ExploreScreen.css';

function ExploreScreen() {
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [perPage] = useState(8)
  const [pageCount, setPageCount] = useState(0)

  const base_url = 'https://developer.nps.gov/api/v1'
  const endpoint_url = '/parks?limit=600&api_key=' + process.env.REACT_APP_API_KEY
  const url = base_url + endpoint_url

  const getData = async() => {
    const res = await axios.get(url)
    const data = res.data.data
    console.log(data)
    const slice = data.slice(offset, offset+perPage)
    console.log(slice)
    const postData = slice.map(park => 
      <div key={park.id}>
        <h5>{park.fullName}</h5>
        <img src={park.images[0].url}></img>
        <p>{park.description}</p>
        <Link className="button-explore" to={`/explore/${park.parkCode}`}>More Info</Link>
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

  
  return (
    <div>
      <div className='main-explore'>
        <h2>Explore All National Park Services</h2>
        <div className='container-explore'>
          <div className='card-explore'>
            {data[0]}
          </div>
          <div className='card-explore'>
            {data[1]}
          </div>
          <div className='card-explore'>
            {data[2]}
          </div>
          <div className='card-explore'>
            {data[3]}
          </div>
        </div>

        <div className='container-explore'>
          <div className='card-explore'>
            {data[4]}
          </div>
          <div className='card-explore'>
            {data[5]}
          </div>
          <div className='card-explore'>
            {data[6]}
          </div>
          <div className='card-explore'>
            {data[7]}
          </div>
        </div>
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
 
    </div>
  );
}

export default ExploreScreen;
