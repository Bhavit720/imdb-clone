import { useState, useEffect, useRef } from 'react';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from '../services/movieService.js';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function MovieCard() {
 const [popularMovies, setPopularMovies] = useState([]);
const [topRatedMovies, setTopRatedMovies] = useState([]);
const [upcomingMovies, setUpcomingMovies] = useState([]);
const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

const popularRef = useRef(null);
const topRatedRef = useRef(null);
const upcomingRef = useRef(null);
const nowPlayingRef = useRef(null);


useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getPopularMovies();
        setPopularMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

        const fetchtopRatedMovies = async () => {
      try {
        const response = await getTopRatedMovies();
        setTopRatedMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

        const fetchupcomingMovies = async () => {
      try {
        const response = await getUpcomingMovies();
        setUpcomingMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

        const fetchnowPlayingMovies = async () => {
      try {
        const response = await getNowPlayingMovies();
        setNowPlayingMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
    fetchtopRatedMovies();
    fetchupcomingMovies();
    fetchnowPlayingMovies();
  }, []);

    const scroll = (ref, offset) => {
    if (ref.current) {
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

 return (
    <div>
      {/* Top Picks */}
      <div className="mb-3">
        <h3 className="p-2 font-bold w-screen text-lg text-white">Top Picks</h3>
      </div>
      <div className="relative">
        <div ref={popularRef} className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-96 box-content">
          {popularMovies.map((m) =>
            m.backdrop_path && (
              <div
                key={m.id}
                className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                  alt={m.title}
                  className="w-full h-1/2 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-yellow-400">⭐ {m.vote_average}</p>
                  <h2 className="text-lg font-semibold">{m.title}</h2>
                  <p className="text-sm text-gray-400">Released: {m.release_date}</p>
                </div>
                <div className="absolute bottom-5">
                  <button className="bg-slate-700 rounded-2xl w-44 relative left-2 text-blue-300 p-2 hover:bg-slate-600">
                    <span>+ </span>Watch List
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <button
          onClick={() => scroll(popularRef, -300)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => scroll(popularRef, 300)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Top Rated */}
      <div className="mb-3">
        <h3 className="p-2 font-bold w-screen text-lg text-white">Top Rated</h3>
      </div>
      <div className="relative">
        <div ref={topRatedRef} className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-96 box-content">
          {topRatedMovies.map((m) =>
            m.backdrop_path && (
              <div
                key={m.id}
                className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                  alt={m.title}
                  className="w-full h-1/2 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-yellow-400">⭐ {m.vote_average}</p>
                  <h2 className="text-lg font-semibold">{m.title}</h2>
                  <p className="text-sm text-gray-400">Released: {m.release_date}</p>
                </div>
                <div className="absolute bottom-5">
                  <button className="bg-slate-700 rounded-2xl w-44 relative left-2 text-blue-300 p-2 hover:bg-slate-600">
                    <span>+ </span>Watch List
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <button
          onClick={() => scroll(topRatedRef, -300)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => scroll(topRatedRef, 300)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Upcoming */}
      <div className="mb-3">
        <h3 className="p-2 font-bold w-screen text-lg text-white">Upcoming</h3>
      </div>
      <div className="relative">
        <div ref={upcomingRef} className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-96 box-content">
          {upcomingMovies.map((m) =>
            m.backdrop_path && (
              <div
                key={m.id}
                className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                  alt={m.title}
                  className="w-full h-1/2 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-yellow-400">⭐ {m.vote_average}</p>
                  <h2 className="text-lg font-semibold">{m.title}</h2>
                  <p className="text-sm text-gray-400">Released: {m.release_date}</p>
                </div>
                <div className="absolute bottom-5">
                  <button className="bg-slate-700 rounded-2xl w-44 relative left-2 text-blue-300 p-2 hover:bg-slate-600">
                    <span>+ </span>Watch List
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <button
          onClick={() => scroll(upcomingRef, -300)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => scroll(upcomingRef, 300)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      {/* Now Playing */}
      <div className="mb-3">
        <h3 className="p-2 font-bold w-screen text-lg text-white">Now Playing</h3>
      </div>
      <div className="relative">
        <div ref={nowPlayingRef} className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-96 box-content">
          {nowPlayingMovies.map((m) =>
            m.backdrop_path && (
              <div
                key={m.id}
                className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${m.backdrop_path}`}
                  alt={m.title}
                  className="w-full h-1/2 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm text-yellow-400">⭐ {m.vote_average}</p>
                  <h2 className="text-lg font-semibold">{m.title}</h2>
                  <p className="text-sm text-gray-400">Released: {m.release_date}</p>
                </div>
                <div className="absolute bottom-5">
                  <button className="bg-slate-700 rounded-2xl w-44 relative left-2 text-blue-300 p-2 hover:bg-slate-600">
                    <span>+ </span>Watch List
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <button
          onClick={() => scroll(nowPlayingRef, -300)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={() => scroll(nowPlayingRef, 300)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
}
