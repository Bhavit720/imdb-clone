import React,{useState} from "react";
import SearchBar from "./Searchbar.js";
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { SavedContext } from "../context.js";

export default function Navbar() {
  const {savedItems} = useContext(SavedContext);
   const navigate = useNavigate();
  const watchnavigate = useNavigate()

  return (
<div className="bg-black text-white w-full">
  <div className="flex flex-row sm:flex-row items-center bg-gray-800 px-4 py-3 sm:py-2 gap-4 sm:gap-8">
    {/* Logo - Flex-none prevents shrinking */}
    <div className="flex-none sm:flex-1 sm:text-left">
      <button onClick={() => navigate('/')} className="sm:ml-14">
        <img 
          className="h-8 sm:h-9 rounded-lg" 
          src="/images/imdb logo.jpeg" 
          alt="imdb logo"
        />
      </button>
    </div>
    
    {/* Search - Flex-grow for available space */}
    <div className="flex-grow w-full sm:w-auto max-w-md">
      <SearchBar />
    </div>
    
    {/* Watchlist - Flex-none prevents shrinking */}
    <div className="flex-none sm:flex-1 sm:text-right">
      <button 
        className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-300 rounded-lg 
                  hover:text-black text-sm sm:text-base whitespace-nowrap"
        onClick={() => watchnavigate('/watchlist')}
      >
        <img src="/images/watchlist icon.jpeg" className="w-4 h-4" alt="Watchlist" />
        <span className=" sm:inline mr-1">WatchList</span>
        <span className="text-black bg-yellow-300 h-1 w-8 rounded-full pb-6">{savedItems.length}</span>
      </button>
    </div>
  </div>
</div>
);
}
