import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader"

function ProfileScreen() {
    const history = useHistory()
    const [userData, setUserData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [userAuth, setUserAuth] = useState(false)
    const [dataLoaded, setDataLoaded] = useState(false)

    const checkUserAuth = async() => {
        await axios.get("/userauth", {withCredentials: true})
            .then((res) => (setUserAuth(res.data.auth)))
        setLoaded(true)
    }
    
    const getUserData = async() => {
        const res = await axios.get("/user", {withCredentials: true})
        const data = res.data
        setUserData(data)
        setDataLoaded(true)
    }

    useEffect(() => {
        checkUserAuth()
        if(loaded){
            if(userAuth){
                getUserData()
            } else{
                history.push("/login")
            }
        }
    }, [loaded, userAuth])

    return (
        <div className="bg-black h-screen">
            { dataLoaded ? (
            <div className="text-center text-gray-200">
                <h1>{userData.first}</h1>
                <h1>{userData.last}</h1>
                <h1>{userData.username}</h1>

                <h1>My Favorites</h1>
                { userData.favorites.length > 0 ? (
                    <ui className="list-none">
                        {userData.favorites.map((fav) => 
                        <li key={userData.favorites.index}>
                            - {fav}
                        </li>)}
                    </ui>
                    )
                     : <h1>You have no favorites yet!</h1>
                }
                 
            </div>
            ) : (
                <div className="text-center bg-black h-screen">
                    <ClipLoader color={"white"} size={150}/>
                </div>)}
        </div>
        
    )
}

export default ProfileScreen