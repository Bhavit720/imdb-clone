import { useState, useEffect } from 'react';
import CategoryRow from './CategoryRow';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from '../services/movieService.js';


export default function MovieList() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await getPopularMovies();
        
        setPopularMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const fetchTopRatedMovies = async () => {
      try {
        const response = await getTopRatedMovies(); 
        
        setTopRatedMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching top rated movies:', error);
      }
    };

    const fetchUpcomingMovies = async () => {
      try {
        const response = await getUpcomingMovies(); 
       
        setUpcomingMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    const fetchNowPlayingMovies = async () => {
      try {
        const response = await getNowPlayingMovies();
        
        setNowPlayingMovies(response.data.results || []);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    
    fetchPopularMovies();
    fetchTopRatedMovies(); 
    fetchUpcomingMovies(); 
    fetchNowPlayingMovies();
  }, []);
  const movieArray = [...popularMovies,...topRatedMovies,...upcomingMovies,...nowPlayingMovies]
//  if(!popularMovies.length && topRatedMovies.length && upcomingMovies.length && nowPlayingMovies.length){
//     return <div>Loading..</div>
//  }
  return (
    <div>
      <CategoryRow title="Popular Movies" movies={popularMovies} />
      <CategoryRow title="Top Rated Movies" movies={topRatedMovies} />
      <CategoryRow title="Upcoming Movies" movies={upcomingMovies} />
      <CategoryRow title="Now Playing Movies" movies={nowPlayingMovies} />
    
    </div>
  );
}
