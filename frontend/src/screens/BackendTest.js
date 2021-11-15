import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { UserContext } from "../context/UserContext";
import {Link} from "react-router-dom"

function BackendTest() {
    const [data, setData] = useState(null)
    const { user, setUser } = useContext(UserContext);
    const [favorites, setFavorites] = useState([])
    const parkcode = "test"

    function handleClick(){

        axios.get("/userauth",{withCredentials: true})
        .then((res) =>{
            console.log(res.data)
            setUser((prevState) => ({
                ...prevState,
                favorites: [...prevState.favorites, parkcode]
            }))
        })
        
    }
    // user.favorites.filter(park => park !== parkcode)
    
    
    useEffect(() => {
        // axios.get("/api")
        //   .then((res) => setData(res.data.message))
        
        console.log("Changed User")
      }, [user]);

    return (
        <div>
            <h1>National Park Site</h1>
            <p>Data Message Here:</p>
            <p>{!data ? "Loading..." : data}</p>
            <Link to="#" onClick={() => handleClick()}>Change User</Link>
            <p>{user.favorites}</p>
        </div>
    )
}

export default BackendTest