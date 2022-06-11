import React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function ProfileParks({
  loaded,
  section,
  categoryData,
  removeToggled,
  removeFunction,
  category,
}) {
  return (
    <div>
      {loaded ? (
        <div className="text-gray-200">
          <div className="text-center pt-3">
            <h1 className="text-5xl text-yellow-300 my-2 font-bold">
              {section} Parks
            </h1>
          </div>

          {category.length > 0 ? (
            <div className="lg:grid lg:grid-cols-3 xl:px-14 2xl:px-64">
              {categoryData.map((park) => (
                <div
                  key={categoryData.id}
                  className="p-4 w-auto relative h-48 my-4 md:h-56 xl:h-64 2xl:h-80"
                >
                  <Link
                    className=""
                    to={removeToggled ? "#" : `/explore/${park.parkCode}`}
                    onClick={() => removeFunction(park.parkCode)}
                  >
                    <div
                      className={
                        removeToggled
                          ? "group w-full h-48 md:h-56 xl:h-64 2xl:h-80 bg-red-600 rounded-lg"
                          : "group w-full h-48 md:h-56 xl:h-64 2xl:h-80"
                      }
                    >
                      <img
                        className={
                          removeToggled
                            ? "popular-explore-card-remove object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-80"
                            : "popular-explore-card object-cover w-full h-48 md:h-56 xl:h-64 2xl:h-80 opacity-90"
                        }
                        src={park.images[0].url}
                      />
                      <div
                        className={
                          removeToggled
                            ? "popular-explore-card-text-remove top-6 right-8"
                            : "popular-explore-card-text top-6 right-8"
                        }
                      >
                        {park.name}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-xl py-2">You have no {section} yet!</h1>
              <h1 className="text-xl">Explore parks to add some!</h1>
              <Link
                className="btn btn-other px-6 py-4 xl:px-8 xl:py-6 my-6 font-bold"
                to="/explore"
              >
                Add {section}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center bg-gray-900 mt-24 h-screen">
          <ClipLoader color={"white"} size={150} />
        </div>
      )}
    </div>
  );
}

export default ProfileParks;
