import React, { useRef } from "react";
import { assets } from "../../../public/assets";
import { useContext } from "react";
import { contextData } from "../../context/AppContext";

const Hero = () => {
  const { search, setSearch, isSearch, setIsSearch, BaseUrl } =
    useContext(contextData);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleSearch = () => {
    setSearch({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearch(true);
  };
  return (
    <>
      <div className="container mx-auto my-10 2xl:px-20 px-5">
        <div className="rounded-md bg-gradient-to-r from-purple-800 to-purple-950 text-white py-10 px-5 text-center">
          <h2 className="text-xl md:text-3xl font-bold">
            Over 10,000+ Jobs to Apply
          </h2>
          <p className="max-w-xl mx-auto py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            magnam id quae ullam esse asperiores modi, praesentium aliquid ipsam
            exercitationem. Impedit repellendus iste id a voluptatum facere
            iusto numquam nulla!
          </p>
          <div className="bg-white text-gray-600 rounded flex items-center justify-between mx-4 max-w-xl md:mx-auto">
            <div>
              <input
                ref={titleRef}
                type="text"
                placeholder="Search Job"
                className="rounded outline-none w-full p-2 max-sm:text-xs"
              />
            </div>
            <p>|</p>
            <div>
              <input
                ref={locationRef}
                type="text"
                placeholder="Location"
                className="rounded outline-none w-full p-2 max-sm:text-xs"
              />
            </div>
            <button
              onClick={handleSearch}
              type="submit"
              className="bg-purple-500 m-1 text-white px-5 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <div className="border rounded shadow-sm py-3 my-5">
          <div className="flex items-center gap-10 flex-wrap mx-5">
            <p className="md:text-xl">Trusted By</p>
            <img className="h-7" src={assets.accenture} alt="" />
            <img className="h-7" src={assets.walmart} alt="" />
            <img className="h-7" src={assets.microsoft} alt="" />
            <img className="h-7" src={assets.amazon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
