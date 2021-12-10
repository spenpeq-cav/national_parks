import React from "react";

function ThingsSection(props) {
  const data = props.data;
  return (
    <div className="bg-gray-200 xl:py-16">
      <div className="lg:grid lg:grid-cols-2 xl:py-4 xl:px-24 xl:gap-10">
        <img src={data.images[1].url} />
        <div className="py-2 px-4 pt-12 md:px-12">
          <h2 className="text-black text-4xl font-semibold">Activites</h2>
          <h3 className="text-black uppercase py-2 font-semibold">
            Things to Do
          </h3>
          <p className="text-black text-md py-4 text-md">
            <ui className="grid grid-cols-2 list-none">
              {data.activities.map((act) => (
                <li key={data.activities.index}>- {act.name}</li>
              ))}
            </ui>
          </p>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-2 xl:py-4 xl:px-24 xl:gap-10 mt-16">
        <div className="py-2 px-4 md:px-12">
          <h2 className="text-black text-4xl font-semibold">Topics</h2>
          <h3 className="text-black uppercase py-2 font-semibold">
            Things to Learn
          </h3>
          <p className="text-black text-md py-4">
            <ui className="grid grid-cols-2 list-none">
              {data.topics.map((act) => (
                <li key={data.topics.index}>- {act.name}</li>
              ))}
            </ui>
          </p>
        </div>

        {data.images.length > 2 ? (
          <>
            <img src={data.images[2].url} />
          </>
        ) : (
          <>
            <img src={data.images[1].url} />
          </>
        )}
      </div>
    </div>
  );
}

export default ThingsSection;
