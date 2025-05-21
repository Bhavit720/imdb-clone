import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { getTrendingMovies } from "../services/movieService";
// import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
function Carousel() {
  const [current, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const[isAnimate,setAnimate] = useState(false)

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
    setAnimate(true)
    setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % movies.length);
      setAnimate(false)
    }, 500)
  };

  const prevSlide = () => {
     setAnimate(true)
         setTimeout(() => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
      setAnimate(false)
    }, 500)

  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (!movies.length) return <div className="text-white">Loading...</div>;

  const movie = movies[current];

  return (
    <div className="relative top-0 left-44 w-3/4 h-3/4 overflow-hidden rounded-lg border border-yellow-300 ">
 <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{ transform: `translateX(-${current * 100}%)` }}
  >
    {movies.map((m) => (
      <img
        key={m.id}
        src={`https://image.tmdb.org/t/p/original${m.backdrop_path}`}
        alt={m.title}
        className="w-full h-full object-cover flex-shrink-0"
      />
    ))}
  </div>      
  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white p-4 md:p-8 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h2>
          <p className="text-lg md:text-xl mb-6">{movie.overview}</p>
          <button className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300">
            Watch Trailer
          </button>
        </div>
      </div>

     
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
      >
        <ChevronLeftIcon className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
      >
        <ChevronRightIcon className="w-6 h-6 text-black" />
      </button>

      
      {/* <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${current === i ? "bg-white scale-110" : "bg-white bg-opacity-50"}
              `}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-dvw bg-black p-6 overflow-hidden scrollbar-hide">
      <div className="flex justify-start m-12">
         <Carousel />
      </div>
     
      <MovieList />
    </div>
  );
}
