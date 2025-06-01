
import { useState,useEffect}  from "react";
import {useNavigate} from 'react-router-dom';
import { searchMovies } from "../services/movieService";

export default function SearchBar(){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchMovies(searchTerm)
          .then(res => setSearchResults(res?.data?.results?.slice(0, 6) || []))
          .catch(err => console.error(err));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSelect = (movie) => {
    setSearchTerm('');
    setSearchResults([]);
    navigate(`/moviedetails/${movie.id}`);
  };
      return(
<div className="w-full sm:w-auto mx-2 sm:mx-0">
  <div className="relative">
    <input 
      type="text" 
      placeholder="Search IMDB" 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      className="w-full sm:w-full md:w-80 h-8 sm:h-9 rounded-lg bg-white text-black px-3 py-1 
                focus:border-yellow-300 focus:border-2 focus:outline-none text-sm sm:text-base" 
    />
    {searchResults.length > 0 && (
      <ul className="absolute bg-black border border-gray-300 w-full list-none mt-1 rounded-lg 
                   overflow-hidden z-[1000] shadow-md">
        {searchResults.map(movie => (
          <li
            key={movie.id}
            onClick={() => handleSelect(movie)}
            className="p-2 cursor-pointer hover:bg-slate-300 text-white hover:text-black 
                      text-sm sm:text-base"
          >
            {movie.title}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>    
)
}