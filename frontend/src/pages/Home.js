import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "@heroicons/react/24/solid";
import { getTrendingMovies } from "../services/movieService";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";

function Carousel() {
  const [current, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [isAnimate, setAnimate] = useState(false);
  const [upNextMovies, setUpNextMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const nextSlide = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
      setAnimate(false);
    }, 100);
  };

  const prevSlide = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
      setAnimate(false);
    }, 100);
  };

  useEffect(() => {
    if (!movies.length) return;
    const nextMovies = [];
    for (let i = 1; i < movies.length; i++) {
      const index = (current + i) % movies.length;
      nextMovies.push(movies[index]);
    }
    setUpNextMovies(nextMovies);
  }, [current, movies]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies.length) return <div className="text-white"></div>;

  const movie = movies[current];

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 px-4">
     
      <div className="relative w-full md:w-3/4 h-[300px] md:h-[450px] rounded-xl overflow-hidden border border-yellow-300">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {movies.map((m) => (
            <img
              key={m.id}
              src={`https://image.tmdb.org/t/p/original${m?.backdrop_path}`}
              alt={m.title}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

       
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 md:p-8">
          <div className="flex items-center gap-4 w-full">
           
            <div className="flex-shrink-0 hidden sm:block">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie.title}
                className="w-24 h-32 md:w-36 md:h-48 rounded-xl shadow-lg object-cover relative top-6"
              />
            </div>

           
            <div>
              <button className="bg-transparent border-yellow-300 border-2 rounded-full p-3 hover:bg-yellow-300 hover:text-black transition duration-300 relative top-6">
                <PlayIcon className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </button>
            </div>

          
            <div className="flex-grow text-white">
              <Link to={`/moviedetails/${movie.id}`}>
                <h2 className="text-xl md:text-3xl font-bold hover:underline relative top-6">{movie.title}</h2>
              </Link>
            </div>
          </div>
        </div>

        
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
      </div>

      
      <div className="w-full md:w-1/4 bg-black bg-opacity-30 p-4 rounded-xl max-h-[450px] overflow-hidden">
        <h2 className="text-yellow-300 text-lg md:text-xl font-semibold mb-4">Up Next</h2>
        <div className="flex flex-col gap-4">
          {upNextMovies.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-4 bg-white bg-opacity-5 hover:bg-opacity-10 rounded-md p-2 transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                alt={m.title}
                className="w-16 h-24 md:w-20 md:h-28 object-cover rounded-md shadow-md"
              />
              <div className="flex flex-col justify-between flex-grow">
                <button className="self-start bg-transparent border border-white rounded-full p-1 hover:bg-yellow-300 hover:text-black transition duration-300 mb-1">
                  <PlayIcon className="h-4 w-4 text-white" />
                </button>
                <Link to={`/moviedetails/${m.id}`}>
                  <p className="text-white text-sm font-medium hover:underline">{m.title}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full bg-black p-4 md:p-6 overflow-hidden">
      <div className="mb-8">
        <Carousel />
      </div>
      <MovieList />
    </div>
  );
}
