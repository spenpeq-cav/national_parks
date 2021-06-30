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

  const [filterNPOnly, setFilterNPOnly] = useState(false)

  const base_url = 'https://developer.nps.gov/api/v1'
  var endpoint_url = '/parks?limit=600&api_key=' + process.env.REACT_APP_API_KEY
  var url = base_url + endpoint_url

  const getData = async() => {
    if(filterNPOnly){
      endpoint_url = '/parks?parkCode=yell&api_key=' + process.env.REACT_APP_API_KEY
      url = base_url + endpoint_url
    }
    const res = await axios.get(url)
    const data = res.data.data
    const slice = data.slice(offset, offset+perPage)
    const postData = slice.map(park => 
      <div key={park.id}>
        <h5>{park.fullName}</h5>
        <Link>
          <img src={park.images[0].url}></img>
        </Link>
        {/* <p>{park.description}</p>
        <Link className="button-explore" to={`/explore/${park.parkCode}`}>More Info</Link> */}
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
  }, [offset, filterNPOnly])

  
  return (
    <div>
      <div className='main-explore'>
        <h2>Explore All National Park Services</h2>
        <div className='button-container'>
          <div class="vertical-center">
            <input type="button" onClick={() => setFilterNPOnly(false)} value="All"></input>
            <input type="button" onClick={() => setFilterNPOnly(true)} value="National Parks"></input>
            <p>Filter : {String(filterNPOnly)}</p>
          </div>
        </div>
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
