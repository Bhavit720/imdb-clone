
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
          .then(res => setSearchResults(res.data.results.slice(0, 6)))
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
        <div>
            <div>
                <div className="relative left-40">
                    <div>
                    <input type="text" placeholder="Search IMDB" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-96 h-10  rounded-lg bg-white text-black p-2 focus:border-yellow-300 focus:border-2 focus:outline-none" />
                        {searchResults.length > 0 && (
                                <ul  className="absolute bg-black border border-gray-300 w-full list-none m-0 p-0 z-[1000] shadow-md">
                                {searchResults.map(movie => (
                                    <li
                                    key={movie.id}
                                    onClick={() => handleSelect(movie)}
                                    className="p-2 cursor-pointer bg-black relative z-[1000] hover:bg-slate-300 text-white hover:text-black"
                                    >
                                    {movie.title}
                                    </li>
                                ))}
                                </ul>
                            )}
                    </div>
                
                 </div>

               
            </div>
            
        </div>
    )
}