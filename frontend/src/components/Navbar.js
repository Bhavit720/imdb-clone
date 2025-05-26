import React,{useState} from "react";
import SearchBar from "./Searchbar.js";
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
   const navigate = useNavigate();
  const watchnavigate = useNavigate()

  return (
    <div className="bg-black text-white p-0 mx-0 w-dvw">
        <div className="p-1 flex gap-x-52 z-10 bg-gray-800 w-full">
            <button onClick={() => navigate('/')}>
            <img className="w-auto h-10 rounded-lg relative left-14" src="./images/imdb logo.jpeg" alt="imdb logo"/>
          </button>
                  <SearchBar/>
          <button className="flex items-center gap-2 my-2 px-2 py-1 hover:bg-slate-300 rounded-lg w-fit hover:text-black" onClick={()=>watchnavigate('/watchlist')}>
            <img src="./images/watchlist icon.jpeg" className="w-4 h-4" alt="Watchlist logo" />
            <span>WatchList</span>
          </button>
        </div>
    </div>
  );
}
