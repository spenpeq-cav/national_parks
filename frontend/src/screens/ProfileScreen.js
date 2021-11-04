import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ProfileScreen() {
    const [userData, setUserData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const getUserData = async() => {
        const res = await axios.get("/profile")
        const data = res.data
        setUserData(data)
        setLoaded(true)
    }

    useEffect(() => {
        getUserData()
    }, [loaded])

    return (
        <div className="text-center">
            <h1>{userData.first}</h1>
            <h1>{userData.last}</h1>
            <h1>{userData.username}</h1>
        </div>
    )
}

export default ProfileScreen