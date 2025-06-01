import React, {  useEffect, useState } from 'react';
import { SavedContext } from "../context";
import { useContext } from "react";
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMoviesImages,
} from '../services/movieService';
import '@fontsource/roboto'; 
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader';


const MovieDetailsPage = () => {
  const { saveData, savedItems,removeData } = useContext(SavedContext);
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [crew,setCrew] = useState([])
  const navigate = useNavigate();
  const imageNavigate = useNavigate();
  const castNavigate = useNavigate()
  useEffect(() => {
    getMovieDetails(id).then(res => setDetails(res.data)).catch(console.error);
    getMovieCredits(id).then(res => setCredits(res.data)).catch(console.error);
    getMovieVideos(id).then(res => setVideos(res.data.results)).catch(console.error);
    getMoviesImages(id).then(res => setImages(res.data.backdrops)).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (credits) {
      setCrew([...credits.crew]);
    }
  }, [credits]);  

const Director = crew?.filter(f => f.job === "Director") || [];
const Writer = crew?.filter(f=>f.job == "Writer") || [];
const isAlreadySaved = details && savedItems?.some(item => item?.id === details.id);
const validVideos = videos.filter((video) => video?.key);
 const handlefilter = () => {
    if (isAlreadySaved) {
      removeData(details);
    } else {
      saveData(details);
    }
  };


  
  if (!details) return <Loader/>;

  const handleSelect = (movie) => {
    navigate(`/AllVideos/${movie.id}`);
  };

  const handleImageSelect = (movie) =>{
    imageNavigate(`/AllImages/${movie.id}`)
  }
  const handleCastNavigate = (movie) =>{
    castNavigate(`/AllCasts/${movie.id}`)
  }

  return (
    <div className='sm:w-screen min-h-[100vh] pb-2 bg-black overflow-hidden scrollbar-hide
'>
      <div className='relative left-14 py-8 '>
      <div className='flex sm:flex-row sm:gap-8 w-full sm:items-center md:items-center
md:flex-row md:gap-3 md:justify-between  md:w-[92%]
'>
        <div>
          <h2 className=' text-white text-3xl'>{details.title}</h2>
          <div className='flex gap-2'>
          <p className='text-slate-300'>{details.release_date}</p>
          <p className='text-slate-300'>{details.runtime} minutes</p>
          </div>
        </div>
      <div className='relative md:left-64 sm:left-0'>
        <p className='text-slate-400 font-roboto space-x-2'>IMDb Rating</p>
        <p className='text-white'>⭐{details.vote_average}/10</p>
      </div>
      <div>
        <p className=' text-slate-400 font-roboto space-x-2'>Popularity</p>
        <p className='text-white'>{details.popularity}</p>
      </div>
      </div>
    <div className=' md:flex gap-2'>
      
            {details.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title || 'Poster'}
                className=" md:w-68 md:h-96 md:rounded-lg"
              />
            ) : (
              <div className="text-white">
                
              </div>
            )}        
            {videos.length > 0 && (
                <>
                  {videos.slice(0,1).map(video => (
                    <iframe
                      key={video.id}
                      className=' w-full h-60 rounded-lg sm:w-3/4 sm:mt-4 md:mt-0 sm:h-72 sm:rounded-xl md:w-3/5 md:h-96 md:rounded-2xl
'
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      allowFullScreen
                    ></iframe>
                  ))}
                </>
              )||<div className='text-white'></div>}
          <div className='flex md:flex-col gap-2 sm:flex-row'>
            <button className='sm:mt-4 md:mt-0 sm:w-[40%] md:w-48 md:h-1/2 rounded-lg bg-gray-800 hover:bg-gray-500 flex  flex-col justify-center items-center' onClick={()=>handleSelect(details)}>
              <img src='/images/video icon.jpg' alt='videos' className='h-10 w-10'/>
              <b className='text-white'>{videos.length<=99?videos.length+" videos":"99+ photos"}</b>
            </button>
            <button className='sm:w-[34%] sm:mt-4 md:mt-0 md:w-48 md:h-1/2 rounded-lg bg-gray-800 hover:bg-gray-500 flex  flex-col justify-center items-center' onClick={()=>handleImageSelect(details)}>
              <img src='/images/image icon.jpg' alt='photos' className='h-10 w-10'/>
              <b className='text-white'>{images.length<=99?images.length+" photos":"99+ photos"}</b>
            </button>
          </div>

      </div>
      <div className='py-4 flex w-full gap-2 relative md:flex-row sm:flex-col'>
        <div className='w-full'>
          <p className='text-white w-3/4 text-justify font-semibold py-4'>{details.overview}</p>
          <hr className='border-gray-500 w-4/5'/>
          <p className='text-white font-bold mt-3 inline-block '>Director</p>
                  <b className='ml-4'>
                    {Director && Director.length > 0 ? (
                      Director.slice(0, 1).map((crew, index, arr) => (
                        <div className='inline' key={crew.id}>
                          <p className='text-blue-500 inline'>
                            {crew.name}
                            {index < arr.length - 1 && (
                              <span className='text-gray-200 font-bold px-2'>&middot;</span>
                            )}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span className='text-gray-400'>No director available</span>
                    )}
                  </b>
            <hr className='border-gray-500 w-4/5 mt-3'/>
            <p className='text-white font-bold mt-3 inline-block '>Writer</p>
                    <b className='ml-4'>
                      {Writer && Writer.length > 0 ? (
                        Writer.slice(0, 2).map((crew, index, arr) => (
                          <div className='inline' key={crew.id}>
                            <p className='text-blue-500 inline'>
                              {crew.name}
                              {index < arr.length - 1 && (
                                <span className='text-gray-200 font-bold px-2'>&middot;</span>
                              )}
                            </p>
                          </div>
                        ))
                      ) : (
                        <span className='text-gray-400'>No writers available</span>
                      )}
                    </b>
                <hr className='border-gray-500 w-4/5 mt-3'/>
                <p className='text-white font-bold mt-3 inline-block '>Stars</p>
              <b className='ml-4'>
                {credits?.cast && credits.cast.length > 0 ? (
                  credits.cast.slice(0, 3).map((crew, index, arr) => (
                    <div className='inline' key={crew.id}>
                      <p className='text-blue-500 inline'>
                        {crew.name}
                        {index < arr.length - 1 && (
                          <span className='text-gray-200 font-bold px-2'>&middot;</span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <span className='text-gray-400'>No cast available</span>
                )}
              </b>
             
          </div>
        <div className='md:w-1/3 relative md:right-40 flex flex-col gap-2 bottom-0 sm:w-3/4'>
         <div className='w-32 h-32 relative top-6'>
          <p className='text-yellow-300 text-sm'>Rent/buy</p>
          <img src='/images/prime.jpg' alt='there' className='rounded-xl '></img>
         </div>
          <button className="bg-yellow-300 rounded-3xl min-w-[350px] text-start h-10 text-black  hover:bg-yellow-600 relative left-0 " onClick={handlefilter}
          >
            <span className='mr-3 ml-4'>{isAlreadySaved ? '✔' : '+'}</span> In Watchlist
          </button>
            
            <button className='bg-black rounded-3xl min-w-[350px] text-start h-10 text-blue-500 border-blue-500 border-2  hover:bg-blue-900 hover:text-white  relative left-0 '>
            <span className='mr-3 ml-4'></span>Watched
            </button>
        </div>
      </div>
      </div>
      <div className='bg-white h-fit w-screen' >

        <div className='pb-4 '>
          <div className='relative left-14 top-6 '>
            <button className='text-black text-2xl font-bold' onClick={()=>handleSelect(details)} ><span className="h-24 border-2 border-yellow-400 rounded-3xl "></span><div className='inline-block text-3xl relative left-2'>Videos</div> <span className='font-normal text-sm relative left-2 bottom-1'>{videos.length}</span> <span className='text-slate-500 relative left-2 '>&gt;</span></button>
          </div>
                <div className={`relative top-14 left-14 w-[91%]`}>
                  {videos.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 min-h-fit">
                      {validVideos.slice(0, 2).map((video) => (
                        <iframe
                          key={video.id}
                          className="w-full aspect-video rounded-lg shadow-md"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  ) : (
                    <div className="h-5">No video found</div>
                  )}

                  {videos.length > 3 && (
                    <div className="flex flex-wrap gap-4 mt-6">
                      {validVideos.slice(3, 7).map((video) => (
                        <iframe
                          key={video.id}
                          className="w-[298px] aspect-video rounded-lg shadow-md flex-shrink"
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  )}
                </div>
            <div>
            <div className='relative left-14 top-6 mt-10'>
              <button
                className='text-black text-2xl font-bold pt-8'
                onClick={() => handleImageSelect(details)}
              >
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className='inline-block text-3xl relative left-2 mr-2'>Photos</div>
                <span className='font-normal text-sm relative left-2 bottom-1'>{images.length}</span>
                <span className='text-slate-500 relative left-2'>&gt;</span>
              </button>
            </div>

            {/* Image Section */}
            <div className='relative top-14 left-14 w-[91%]'>
              {images.length > 0 ? (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                  {images.slice(0, 2).map((image) => (
                    <img
                      key={image.file_path}
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt="Backdrop"
                      className="w-full h-80 rounded-lg shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <div className='h-5'>No images found</div>
              )}

              {images.length > 2 && (
                <div className="flex flex-wrap gap-4 mt-6 relative left-0">
                  {images.slice(3, 7).map((image) => (
                    <img
                      key={image.file_path}
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt="Backdrop"
                      className="w-[298px] max-w-full h-48 rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
           <div>
            <div className='relative left-14 top-6 mt-8'>
            <button className='text-black text-2xl font-bold pt-8' 
            type='click'
            onClick={() => {
                handleCastNavigate(details)
            }} ><span className="h-24 border-2 border-yellow-400 rounded-3xl ">
              </span>
              <div className='inline-block text-3xl relative left-2'>Casts</div>
               <span className='font-normal text-sm relative left-4 bottom-1 '>{credits?.cast?.length ?? 0}</span>  <span className='text-slate-500 relative left-2 '>&gt;</span>
               </button>
            </div>
          <div>
          <div className="relative top-10 left-0 w-[100%] bg-white h-full pb-8 px-10 ">
            {credits?.cast?.length > 0 ? (
              <ul className="grid grid-cols-4 gap-8">
                {credits.cast.slice(0, 16).map((member) => (
                  <li
                    key={member.id}
                    className="flex flex-row gap-2 items-center text-center space-y-4 p-4 bg-white rounded-lg  "
                  >
                    <img
                      src={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                          : "/images/noProfile.jpg"
                      }
                      alt={member.name}
                      className=" sm:w-10 sm:h-14 md:w-24 md:h-28 rounded-full object-cover shadow-md"
                    />
                    <div className=''>
                      <p className="font-bold text-md">{member.name}</p>
                      <p className="text-slate-500 text-sm">{member.character}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ):(
              <div className='relative left-5'>No casts found</div>
            )}
          </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  );
};

export default MovieDetailsPage;
