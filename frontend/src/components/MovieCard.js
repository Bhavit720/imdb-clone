import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";


export default function MovieCard({ movie }) {
  
  console.log("Incoming Movie:", movie);

  if (!movie || !movie.vote_average || !movie.title) {
    return <div className="text-red-500">Invalid movie</div>;
  }

  return (
    <div className="flex-shrink-0 w-48 box-border rounded-lg bg-gray-800 text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-1/2 object-cover"
      />
      <div className="p-2">
        <p className="text-sm text-yellow-400">⭐ {movie.vote_average}</p>
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-sm text-gray-400">Released: {movie.release_date}</p>
        <div className="absolute bottom-5">
                <button className="bg-slate-700 rounded-2xl w-44 relative left-0 text-blue-300 p-2 hover:bg-slate-600">
                  <span>+ </span>Watch List
                </button>

        </div>
      </div>
    </div>
  );
}
