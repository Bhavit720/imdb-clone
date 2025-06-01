import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMoviesImages,
} from '../services/movieService';
export default function AllVideos(){
      const { id } = useParams();
      const [details, setDetails] = useState(null);
      const [credits, setCredits] = useState(null);
      const [videos, setVideos] = useState([]);
      const [images, setImages] = useState([]);
      const [sortOrder, setSortOrder] = useState("index");
      const [isOpen, setIsOpen] = useState(false); 
      const selectRef = useRef(null);
      // const[data,setData] = useState(savedItems)
      const[descending,setDescending] = useState(false);

      useEffect(() => {
        getMovieDetails(id).then(res => setDetails(res.data)).catch(console.error);
        getMovieCredits(id).then(res => setCredits(res.data)).catch(console.error);
        getMovieVideos(id).then(res => setVideos(res.data.results)).catch(console.error);
        getMoviesImages(id).then(res => setImages(res.data.backdrops)).catch(console.error);
      }, [id]);
    
      console.log(details)
      if (!details) return <div>Loading movie details...</div>;
    
    return(
        <div className='bg-white pb-6'>
              <div className="bg-black w-full min-h-[200px]">
                <Link to={`/moviedetails/${details.id}`}>
                  <p className='text-white relative left-14 text-lg top-4 hover:underline'><span className='mr-2'>&lt;</span>Back</p>
                </Link>
                <div className='flex gap-2 relative left-14 top-12'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt={details.title}
                        className="w-30 h-28 object-cover rounded-lg"
                    />
                    <div className='absolute bottom-0 left-24 '>
                    <h1 className='text-gray-300 font-bold text-[20px]'>{details.title}</h1>
                    <p className='text-white text-[36px]'>Videos</p>
                    </div>
                </div>
              </div>
               <div className='relative left-14 p-2 top-2 w-[90%] flex flex-wrap justify-between items-center gap-4'>
                  <div className=''>
                        <p className="font-medium text-black">
                        {details.length} {details.length === 1 ? 'Title' : 'Titles'}
                        </p>
                  </div>

                      {/* <div className="flex items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2">
                            <p>Sort by</p>
                            <select
                            ref={selectRef}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            onMouseDown={() => setIsOpen(true)}
                            onBlur={() => setIsOpen(false)}
                            className={`h-8 w-28 font-medium bg-white border-none rounded cursor-pointer transition duration-200
                                focus:border-dotted focus:border-2 focus:border-blue-400 
                                ${!isOpen ? "hover:bg-blue-400 active:bg-blue-600 hover:text-white text-blue-500" : "text-black"}`}
                            style={{ outline: "none" }}
                            >
                            <option value="index">List order</option>
                            <option value="rating">Rating</option>
                            <option value="popularity">Popularity</option>
                            </select>
                        </div>

                     
                        <div>
                            <button
                            onClick={() => setDescending(!descending)}
                            className="flex items-center justify-center bg-white border border-dotted border-blue-400 rounded-2xl h-8 w-8 hover:bg-blue-400 hover:text-white transition duration-200"
                            >
                            {descending ? (
                                <ArrowDownIcon className="w-5 h-5 text-black" />
                            ) : (
                                <ArrowUpIcon className="w-5 h-5 text-black" />
                            )}
                            </button>
                        </div>
                  </div> */}
          </div>
          <div className='relative top-4 left-14 w-[90%]'>
              <div className='grid grid-cols-2  gap-2 w-full box-content'>
                {videos.length > 0 &&
                    videos.map((video) => (
                      <div>
                         <iframe
                        key={video.id}
                        className="w-full aspect-video rounded-lg shadow-md"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      
                      </div>
                  )) || <div>no video found</div>
                  }

                 </div>   
          </div>

      </div>
    )
}