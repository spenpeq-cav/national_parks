import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { stateCodes } from "../constants/stateCodes";
import ExploreParkCard from "../components/ExploreParkCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserContext } from "../context/UserContext";

function ExploreScreen() {
  const INITIAL_FORM_STATE = {
    state: "",
    query: "",
    NPOnly: false,
    list: false,
  };
  const [formState, setFormState] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null
      ? JSON.parse(localExploreFormData)
      : INITIAL_FORM_STATE;
  });

  const [state, setState] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null
      ? JSON.parse(localExploreFormData).state
      : "";
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null
      ? JSON.parse(localExploreFormData).query
      : "";
  });
  const [filterNPOnly, setFilterNPOnly] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null
      ? JSON.parse(localExploreFormData).NPOnly
      : false;
  });
  const [listView, setListView] = useState(() => {
    const localExploreFormData = localStorage.getItem("explore-form");
    return localExploreFormData !== null
      ? JSON.parse(localExploreFormData).list
      : false;
  });

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [splitData, setSplitData] = useState([]);
  const [scrollingData, setScrollingData] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [doneScrollDataLoad, setDoneScrollDataLoad] = useState(false);
  const { user, setUser } = useContext(UserContext);

  function checkFavorite(parkcode) {
    var fav = false;
    if (user) {
      for (var i = 0; i < user.favorites.length; i++) {
        if (user.favorites[i] === parkcode) {
          fav = true;
          break;
        }
      }
    }
    return fav;
  }

  const getData = async () => {
    setLoaded(false);
    setScrollIndex(0);

    const res = await axios.get("/park_data_explore", {
      params: { searchQuery: searchQuery, state: state },
    });
    var data = res.data;

    if (filterNPOnly) {
      var filteredData = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].designation === "National Park") {
          filteredData.push(data[i]);
        }
      }
      data = filteredData;
    }

    const splitArray = [];
    const chunkSize = 6;
    for (var i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      splitArray.push(chunk);
    }
    setSplitData(splitArray);
    setScrollingData(splitArray[0]);
    setDoneScrollDataLoad(true);
    setData(data);
    setLoaded(true);
    console.log("Got data");
    setHasMore(true);
  };

  const getMoreData = () => {
    if (scrollingData.length >= data.length) {
      setHasMore(false);
    } else {
      setScrollIndex(scrollIndex + 1);
      setScrollingData(scrollingData.concat(splitData[scrollIndex + 1]));
    }
  };

  const handleFormChange = (e) => {
    const optionName = e.target.name;
    const value = e.target.value;

    switch (optionName) {
      case "parkState":
        setState(value);
        setFormState((prevState) => ({
          ...prevState,
          state: value,
        }));
        break;

      case "query":
        setSearchQuery(value);
        setFormState((prevState) => ({
          ...prevState,
          query: value,
        }));
        break;

      case "NPOnly":
        setFilterNPOnly(!filterNPOnly);
        setFormState((prevState) => ({
          ...prevState,
          NPOnly: !filterNPOnly,
        }));
        break;

      case "list":
        setListView(!listView);
        setFormState((prevState) => ({
          ...prevState,
          list: !listView,
        }));
        break;
    }
  };

  useEffect(() => {
    if (formState) {
      localStorage.setItem("explore-form", JSON.stringify(formState));
    } else {
      localStorage.setItem("explore-form", JSON.stringify(INITIAL_FORM_STATE));
    }
    console.log("UseEffect Explore");
  }, [formState]);

  return (
    <section className="bg-explore-image bg-cover bg-center bg-fixed p-5 min-h-screen">
      <div className="py-16 max-w-xl mx-auto text-center">
        <h1 className="mt-4 text-6xl font-bold text-gray-900">Explore Parks</h1>
      </div>

      <div className="bg-gray-200 shadow p-4 flex flex-col lg:flex-row mb-15 rounded mx-2 md:mx-4 lg:mx-12 xl:mx-16 2xl:mx-56">
        <select
          className="border border-6 border-solid border-black rounded py-4 px-2 my-2 lg:py-4 lg:mr-8"
          name="parkState"
          onChange={(e) => {
            handleFormChange(e);
          }}
        >
          <option value="" className="">
            {" "}
            Select State
          </option>
          {stateCodes.map((state) => (
            <option
              selected={state.code === formState.state ? true : false}
              value={state.code}
              className="text-md w-auto"
            >
              {state.name}
            </option>
          ))}
        </select>

        <input
          className="w-full rounded border border-3 border-solid border-black py-4 px-2 my-2 lg:py-0"
          type="text"
          placeholder="Search term..."
          value={formState !== "" ? formState.query : null}
          name="query"
          onChange={(e) => {
            handleFormChange(e);
          }}
        />
        <button
          className="bg-green-500 hover:bg-green-400 rounded text-black py-4 my-2 lg:py-0 lg:px-4"
          onClick={() => getData()}
        >
          <p className="font-semibold text-lg lg:flex lg:flex-row">
            <i className="fas fa-search lg:p-1"></i> Search
          </p>
        </button>

        <label className="inline-flex items-center justify-center py-2 lg:pl-4 lg:w-48">
          <input
            type="checkbox"
            checked={filterNPOnly}
            onChange={handleFormChange}
            name="NPOnly"
            className="appearance-none border border-gray-400 rounded-lg h-6 w-6 lg:w-6 lg:h-4 checked:bg-green-500 checked:border-transparent"
          />
          <span className="pl-2 text-gray-900 font-medium lg:text-sm lg:font-normal">
            National Parks Only
          </span>
        </label>

        <label className="inline-flex items-center justify-center py-2 lg:pl-4 lg:w-48">
          <input
            type="checkbox"
            checked={listView}
            onChange={handleFormChange}
            name="list"
            className="appearance-none border border-gray-400 rounded-lg h-6 w-6 lg:w-6 lg:h-4 checked:bg-green-500 checked:border-transparent"
          />
          <span className="pl-2 text-gray-900 font-medium lg:text-sm lg:font-normal">
            Simple List View
          </span>
        </label>
      </div>

      {loaded ? (
        <div>
          {listView ? (
            <div className="">
              {data.map((park) => (
                <ExploreParkCard
                  listView={listView}
                  name={park.name}
                  states={park.states}
                  designation={park.designation}
                  parkCode={park.parkCode}
                  favorite={checkFavorite(park.parkCode)}
                />
              ))}
            </div>
          ) : (
            <>
              <InfiniteScroll
                dataLength={scrollingData.length}
                next={getMoreData}
                hasMore={hasMore}
                loader={
                  <div className="w-full relative py-16">
                    <div className="text-center">
                      <ClipLoader color={"white"} size={100} />
                    </div>
                  </div>
                }
                className="w-auto h-auto"
              >
                <div className="lg:grid lg:grid-cols-3 xl:px-14 2xl:px-64 overflow-hidden">
                  {doneScrollDataLoad &&
                    scrollingData.map((park) => (
                      <ExploreParkCard
                        listView={listView}
                        name={park.name}
                        states={park.states}
                        designation={park.designation}
                        parkCode={park.parkCode}
                        image={park.images[0].url}
                      />
                    ))}
                </div>
              </InfiniteScroll>
            </>
          )}
        </div>
      ) : (
        <div className="w-full relative py-16">
          <div className="text-center">
            <ClipLoader color={"white"} size={150} />
          </div>
        </div>
      )}
    </section>
  );
}

export default ExploreScreen;
