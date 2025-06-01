import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMoviesImages,
} from '../services/movieService';
import '@fontsource/roboto'; 


export default function AllImages(){
    const { id } = useParams();
    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);

          useEffect(() => {
            getMovieDetails(id).then(res => setDetails(res.data)).catch(console.error);
            getMovieCredits(id).then(res => setCredits(res.data)).catch(console.error);
            getMovieVideos(id).then(res => setVideos(res.data.results)).catch(console.error);
            getMoviesImages(id).then(res => setImages(res.data.backdrops)).catch(console.error);
          }, [id]);
        
          console.log(details)
          if (!details) return <div>Loading movie details...</div>;
    
    return(
        <div className='bg-white'>
            <div className="bg-black w-full min-h-[200px]">
                  <Link to={`/moviedetails/${details.id}`}>
                    <p className='text-white relative left-14 text-lg top-4 hover:underline'><span className='mr-2'>&lt;</span>Back</p>
                    </Link>
              
                <div className='flex gap-2 relative left-14 top-14'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt={details.title}
                        className="w-30 h-28 object-cover rounded-lg"
                    />
                    <div className='absolute bottom-0 left-24 '>
                    <h1 className='text-gray-300 font-bold text-[20px]'>{details.title}</h1>
                    <p className='text-white text-[36px]'>Photos</p>
                    </div>
                </div>
              </div>
              <div className='relative left-14 p-2 top-2 w-2/3 flex flex-wrap justify-between items-center gap-4'>
                <p className='font-bold'>Titles</p>
              </div>
              <div className='relative top-4 left-14 w-[90%]'>
                <div className='grid grid-cols-2  gap-2 w-full box-content'>
                        {
                        images.length > 0 && (
                            <>
                            {
                                images.map(image => (
                                <img
                                    key={image.file_path}
                                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                    alt="Backdrop"
                                    className="w-full shadow-md"
                                />
                                ))
                            }
                            </>
                        )|| <div>no images found</div>} 

                </div>
              </div>

        </div>
    )
}