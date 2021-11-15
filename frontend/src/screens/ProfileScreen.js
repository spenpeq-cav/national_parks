import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import { UserContext } from "../context/UserContext"

function ProfileScreen() {

    const { user, setUser } = useContext(UserContext);
    const history = useHistory()
    const [loaded, setLoaded] = useState(false)
    const [favorites, setFavorites] = useState(user.favorites)
    const [favoritesData, setFavoritesData] = useState([])
    const [removeToggled, setRemoveToggled] = useState(false)

    const getUserFavoritesParkData = async() => {
        const favoriteParksString = favorites.toString()

        const base_url = 'https://developer.nps.gov/api/v1'
        const endpoint_url = '/parks?parkCode='+ favoriteParksString +'&api_key=' + process.env.REACT_APP_API_KEY
        const url = base_url + endpoint_url

        const res = await axios.get(url)
        const data = res.data.data

        setFavoritesData(data)
        setLoaded(true)
    }

    function handleRemoveFavorite (parkcode){
        if(removeToggled){
            axios.post("/favoriteAddOrRemove", { parkCode: parkcode, alreadyAFavorite: true})
                .then((res) =>{
                    console.log("Removed")
                    console.log(res)
                    // var spliceData = favoritesData
                    // for(var i = 0; i < favoritesData.length; i++){
                    //     if(favoritesData[i] === parkcode){
                    //         spliceData.splice(i,1)
                    //         break;
                    //     }
                    // }
                    // setFavoritesData(spliceData)
                    // console.log(spliceData) 
                })
                .catch((err) =>{
                    console.log(err)
                })

            var filteredFavorites = user.favorites.filter(park => park !== parkcode)
            setUser((prevState) => ({
                ...prevState,
                favorites: filteredFavorites
            }))
            setFavorites(filteredFavorites)
        }   
    }

    useEffect(() => {
        if(user){
            getUserFavoritesParkData()
        } else {
            history.push("/login")
        }
        console.log("UseEffect")
        
    }, [user])

    return (
        <section className="bg-gray-900 py-16 h-screen">
            { loaded ? (
                <div className="text-gray-200 px-16">
                    <h1 className="text-6xl bold text-center text-green-500">Hello, {user.first}!</h1>
                    <div className="px-10 mt-6 border-2 border-green-500 rounded text-center lg:mx-52 xl:mx-64 2xl:mx-72">
                        <h2 className="text-2xl py-4">Email: {user.username}</h2>
                        <h2 className="text-2xl pb-4">Name: {user.first} {user.last}</h2>
                    </div>
                    
                    <div className="text-center pt-6">
                        <h1 className="text-5xl text-yellow-300 my-2">My Favorite Parks</h1>
                        <button className={favorites.length > 0 ? "btn btn-other px-4 py-1 my-2 text-xs font-bold" : "hidden"} onClick={() => setRemoveToggled(!removeToggled)}><i class="fas fa-times"></i> Toggle Remove</button>
                        <p className={removeToggled ? "text-xs text-red-500" : "hidden"}>Click a Park to Remove From Favorties.</p>
                    </div>
                    
                    { user.favorites.length > 0 ? (
                        <div className="lg:grid lg:grid-cols-3 xl:px-14 2xl:px-64">
                            { favoritesData.map((park) => (
                                <div key={favoritesData.id} className="p-4 w-auto relative h-48 my-4 md:h-56 xl:h-64 2xl:h-80">
                                    <Link className="" to={removeToggled ? "#" : `/explore/${park.parkCode}`} onClick={() => handleRemoveFavorite(park.parkCode)}>
                                        <div className={removeToggled ? "group w-full h-48 md:h-56 xl:h-64 2xl:h-80 bg-red-600" : "group w-full h-48 md:h-56 xl:h-64 2xl:h-80"}>
                                            <img className={removeToggled ? "popular-explore-card-remove object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-80" : "popular-explore-card object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-90"} src={park.images[0].url}/>
                                            <div className={removeToggled ? "popular-explore-card-text-remove top-6 right-8" : "popular-explore-card-text top-6 right-8"}>{park.name}</div>
                                        </div>
                                    </Link> 
                                </div>
                            ))}
                        </div> ) : (
                            <div className="text-center">
                                <h1 className="text-xl py-2">You have no favorites yet!</h1>
                                <h1 className="text-xl">Explore parks to add some!</h1>
                                <Link className="btn btn-other px-6 py-4 xl:px-8 xl:py-6 my-6 font-bold" to="/explore">Add Favorites</Link>
                            </div>
                        )
                    }

                </div> 
                ) : (
                    <div className="text-center bg-gray-900 mt-24">
                        <ClipLoader color={"white"} size={150}/>
                    </div>
                )}
        </section>
        
    )
}

export default ProfileScreen