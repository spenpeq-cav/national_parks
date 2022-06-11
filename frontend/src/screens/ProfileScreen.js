import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../context/UserContext";

import ProfileParks from "../components/ProfileParks";

function ProfileScreen() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [visitedLoaded, setVisitedLoaded] = useState(false);
  const [favorites, setFavorites] = useState(user.favorites);
  const [favoritesData, setFavoritesData] = useState([]);
  const [visited, setVisited] = useState(user.visited);
  const [visitedData, setVisitedData] = useState([]);
  const [removeToggled, setRemoveToggled] = useState(false);

  const getUserFavoritesParkData = async () => {
    const favoriteParksString = favorites.toString();

    const base_url = "https://developer.nps.gov/api/v1";
    const endpoint_url =
      "/parks?parkCode=" +
      favoriteParksString +
      "&api_key=" +
      process.env.REACT_APP_API_KEY;
    const url = base_url + endpoint_url;

    const res = await axios.get(url);
    const data = res.data.data;

    setFavoritesData(data);
    setLoaded(true);
  };

  function handleRemoveFavorite(parkcode) {
    if (removeToggled) {
      axios
        .post("/favorites/addOrRemove", {
          parkCode: parkcode,
          alreadyAFavorite: true,
        })
        .then((res) => {
          console.log("Removed");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      var filteredFavorites = user.favorites.filter(
        (park) => park !== parkcode
      );
      setUser((prevState) => ({
        ...prevState,
        favorites: filteredFavorites,
      }));
      setFavorites(filteredFavorites);
    }
  }

  const getUserVisitedParkData = async () => {
    const visitedParksString = visited.toString();

    const base_url = "https://developer.nps.gov/api/v1";
    const endpoint_url =
      "/parks?parkCode=" +
      visitedParksString +
      "&api_key=" +
      process.env.REACT_APP_API_KEY;
    const url = base_url + endpoint_url;

    const res = await axios.get(url);
    const data = res.data.data;

    setVisitedData(data);
    setVisitedLoaded(true);
  };

  function handleRemoveVisited(parkcode) {
    if (removeToggled) {
      console.log(parkcode);
    }
  }

  useEffect(() => {
    if (user) {
      getUserFavoritesParkData();
      getUserVisitedParkData();
    } else {
      history.push("/login");
    }
    console.log("UseEffect");
  }, [user]);

  return (
    <section className="bg-gray-900 py-16 h-auto">
      {loaded && (
        <div className="text-gray-200 px-16">
          <h1 className="text-6xl font-bold text-center text-green-500">
            {user.first}'s Profile
          </h1>
          <div className="px-10 mt-6 border-b-2 border-green-500 rounded text-center lg:mx-52 xl:mx-64 2xl:mx-72">
            <h2 className="text-2xl py-4">Email: {user.username}</h2>
            <h2 className="text-2xl pb-8">
              Name: {user.first} {user.last}
            </h2>
          </div>

          <div className="text-center pt-6">
            <button
              className={
                favorites.length > 0
                  ? "btn btn-other px-4 py-1 my-2 text-xs font-bold"
                  : "hidden"
              }
              onClick={() => setRemoveToggled(!removeToggled)}
            >
              <i class="fas fa-times"></i> Toggle Remove
            </button>
            <p className={removeToggled ? "text-xs text-red-500" : "hidden"}>
              Click a Park to Remove from your lists.
            </p>
          </div>

          <ProfileParks
            loaded={loaded}
            section={"Favorites"}
            category={favorites}
            categoryData={favoritesData}
            setRemoveToggled={setRemoveToggled}
            removeToggled={removeToggled}
            removeFunction={handleRemoveFavorite}
          />

          <ProfileParks
            loaded={visitedLoaded}
            section={"Visited"}
            category={visited}
            categoryData={visitedData}
            setRemoveToggled={setRemoveToggled}
            removeToggled={removeToggled}
            removeFunction={handleRemoveVisited}
          />
        </div>
      )}
    </section>
  );
}

export default ProfileScreen;
