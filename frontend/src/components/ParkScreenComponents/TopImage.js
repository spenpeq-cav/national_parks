import React from "react";

function TopImage(props) {
  const image = props.img;
  const fullName = props.fullName
  const designation = props.designation

  return (
    <div className="w-full text-center bg-black relative">
      <img
        src={image}
        className="z-1 w-full max-h-screen object-cover opacity-80"
      />
      <div className="absolute m-auto z-10 w-full text-white text-center top-16 sm:top-24 lg:top-44 xl:top-64 2xl:top-80">
        <h1 className="font-bold tracking-wide text-3xl sm:text-5xl md:text-6xl xl:text-7xl px-36 md:px-40">
          {fullName}
        </h1>
        <h2 className="text-md sm:text-lg md:text-xl xl:text-2xl pt-3">
          {designation}
        </h2>
      </div>
    </div>
  );
}

export default TopImage;
