import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GoogleMaps from "../components/GoogleMaps";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../context/UserContext";
import TopImage from "../components/ParkScreenComponents/TopImage";
import ThingsSection from "../components/ParkScreenComponents/ThingsSection";

function ParkScreen({ match }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [alreadyAFavorite, setAlreadyAFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const parkcode = match.params.parkcode;

  const base_url = "https://developer.nps.gov/api/v1";
  const endpoint_url =
    "/parks?parkCode=" + parkcode + "&api_key=" + process.env.REACT_APP_API_KEY;
  const url = base_url + endpoint_url;

  const getData = async () => {
    const res = await axios.get("/park_data", {
      params: { parkCode: parkcode },
    });

    const data = res.data[0];
    setData(data);
    setLoaded(true);
    console.log("Got data");
  };

  function checkFavorite() {
    for (var i = 0; i < user.favorites.length; i++) {
      if (user.favorites[i] === parkcode) {
        setAlreadyAFavorite(true);
        break;
      }
    }
  }

  const handleAddOrRemoveFavorite = () => {
    if (user && alreadyAFavorite === false) {
      axios
        .post("/favoriteAddOrRemove", {
          parkCode: parkcode,
          alreadyAFavorite: false,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      if (!alreadyAFavorite) {
        setUser((prevState) => ({
          ...prevState,
          favorites: [...prevState.favorites, parkcode],
        }));
      }
      console.log("Added");
      setAlreadyAFavorite(true);
    }
  };

  useEffect(() => {
    if (!loaded) {
      getData();
    }
    if (user) {
      checkFavorite();
    }
    console.log("useEffect");
  }, [alreadyAFavorite, user]);

  return (
    <div>
      {loaded ? (
        <section className="bg-black items-center">
          <TopImage
            img={data.images[0].url}
            fullName={data.fullName}
            designation={data.designation}
          />

          <div className="w-full lg:text-center bg-black px-16 py-6 md:grid md:grid-cols-2 lg:grid-cols-5 lg:gap-4 2xl:px-56 lg:py-6">
            <div className="py-2 text-center">
              {alreadyAFavorite ? (
                <div>
                  <Link
                    to="/profile"
                    className="bg-yellow-100 btn border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full transform hover:scale-105 duration-500 py-3 w-24 h-full text-center text-3xl"
                  >
                    <i class="fas fa-star"></i>
                  </Link>
                </div>
              ) : (
                <div>
                  <button
                    className="btn border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full transform hover:scale-105 duration-500 py-3 w-24 h-full text-center text-3xl"
                    onClick={() => handleAddOrRemoveFavorite()}
                  >
                    <i class="far fa-star"></i>
                  </button>
                  <p className="text-yellow-400 font-medium text-sm">
                    Add Favorite
                  </p>
                </div>
              )}
            </div>
            <div className="py-2">
              <h1 className="text-white text-lg uppercase font-bold">
                Location
              </h1>
              <p className="text-white">
                {data.addresses[0].city}, {data.addresses[0].stateCode}
              </p>
            </div>
            <div className="py-2">
              <h1 className="text-white text-lg uppercase font-bold">Email</h1>
              <p className="text-white">
                {data.contacts.emailAddresses[0].emailAddress}
              </p>
            </div>
            <div className="py-2">
              <h1 className="text-white text-lg uppercase font-bold">Phone</h1>
              <p className="text-white">
                {data.contacts.phoneNumbers[0].phoneNumber}
              </p>
            </div>
            <div className="py-2">
              <a
                className="btn btn-gray transform hover:scale-105 duration-350 py-3 w-full text-center"
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 px-6 py-12 lg:pt-24 2xl:py-16 2xl:px-32 2xl:mx-16">
            <h2 className="text-white text-4xl lg:text-center pb-4 lg:col-span-1">
              Overview
            </h2>
            <p className="text-white text-lg 2xl:pr-12 lg:col-span-2">
              {data.description}
            </p>
          </div>
          <div className="lg:grid lg:grid-cols-3 px-6 py-12 lg:pb-24 2xl:py-16 2xl:px-32 2xl:mx-16">
            <h2 className="text-white text-4xl lg:text-center pb-4 lg:col-span-1">
              Climate
            </h2>
            <p className="text-white text-lg lg:col-span-2">
              {data.weatherInfo}
            </p>
          </div>

          <ThingsSection data={data} />

          <div className="bg-black p-8 md:p-12 lg:py-12 lg:px-48 xl:px-64">
            <h2 className="text-gray-100 text-4xl py-2">Directions</h2>
            <p className="text-gray-400 text-lg py-2">{data.directionsInfo}</p>
            <a
              href={data.directionsUrl}
              className="text-gray-100 underline py-2"
            >
              More information...
            </a>
          </div>

          <GoogleMaps lat={data.latitude} lng={data.longitude} />
        </section>
      ) : (
        <div>
          <div className="text-center bg-black h-screen pt-48">
            <ClipLoader color={"white"} size={150} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ParkScreen;
