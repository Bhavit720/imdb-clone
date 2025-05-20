import React from "react";
import SearchBar from "./Searchbar.js";
export default function Navbar() {
  return (
    <div className="bg-black text-white p-0 m-0 w-screen">
        <div className="p-1 flex gap-x-52 z-10 bg-gray-800 w-full">
                  <img className="w-auto h-10 rounded-lg relative left-14" src="./images/imdb logo.jpeg" alt="imdb logo"/>
                  <SearchBar/>

        </div>
    </div>
  );
}
