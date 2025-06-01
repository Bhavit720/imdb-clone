import { SavedContext } from "../context";
import { useContext } from "react";
import { Link } from "react-router-dom";
export default function MovieCard({ movie }) {
  const { saveData, savedItems,removeData } = useContext(SavedContext);

  if (!movie || !movie.vote_average || !movie.title) {
    return null;
  }

  const isAlreadySaved = savedItems.some(item => item.id === movie.id);

 const handlefilter = () => {
    if (isAlreadySaved) {
      removeData(movie);
    } else {
      saveData(movie);
    }
  };
  return (
    <div className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-1/2 object-cover"
      />
      <div className="p-2">
        <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
        <Link to={`/moviedetails/${movie.id}`}>
            <h2 className="text-lg font-semibold hover:underline">{movie.title}</h2>
        </Link>
        <p className="text-sm text-gray-400">Released: {movie.release_date}</p>
        <div className="absolute bottom-5">
          <button
            className="bg-slate-700 rounded-2xl w-44 text-blue-300 p-2 hover:bg-slate-600"
            onClick={handlefilter}
          >
            <span>{isAlreadySaved ? '✔' : '+'}</span> Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
