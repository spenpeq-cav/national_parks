import React from "react";
import { Link } from "react-router-dom";

function ExploreParkCard(props) {
  const listView = props.listView;
  const name = props.name;
  const states = props.states;
  const designation = props.designation;
  const parkCode = props.parkCode;
  const image = props.image;

  return (
    <>
      {listView ? (
        <div className="grid grid-cols-4 border-solid border-2 border-gray-900 text-center mx-4 my-4 lg:mx-12 xl:mx-16 2xl:mx-56 bg-gray-200 bg-opacity-70 rounded-md">
          <div className="py-4 text-gray-900 text-xl font-bold">{name}</div>
          <div className="py-4 text-gray-900 text-md font-semibold">
            {states}
          </div>
          <div className="py-4 text-gray-900 text-md font-semibold">
            {designation}
          </div>
          <Link
            className="btn bg-yellow-500 bg-opacity-90 transform hover:scale-105 duration-350 py-3 w-32 h-10 text-center text-sm m-auto"
            to={`/explore/${parkCode}`}
          >
            View
          </Link>
        </div>
      ) : (
        <div className="p-4 w-auto relative h-48 my-6 md:h-56 xl:h-64 2xl:h-80">
          <Link className="" to={`/explore/${parkCode}`}>
            <div className="group w-full h-48 md:h-56 xl:h-64 2xl:h-80">
              <img
                className="popular-explore-card object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-90"
                src={image}
              />
              <div className="popular-explore-card-text top-6 right-8">
                {name}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ExploreParkCard;
