import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMoviesImages,
} from '../services/movieService';
import '@fontsource/roboto'; 


const MovieDetailsPage = () => {
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

  return (
    <div className='w-screen h-[100%] bg-black min-h-dvh '>
      <div className='relative left-14 py-8 '>
      <div className='flex gap-3 justify-between w-3/4 items-center'>
        <div>
          <h2 className=' text-white text-3xl'>{details.title}</h2>
          <div className='flex gap-2'>
          <p className='text-slate-300'>{details.release_date}</p>
          <p className='text-slate-300'>{details.runtime} minutes</p>
          </div>
        </div>
      <div>
        <p className='text-slate-400 font-roboto space-x-2'>IMDb Rating</p>
        <p className='text-white'>⭐{details.vote_average}/10</p>
      </div>
      <div>
        <p className=' text-slate-400 font-roboto space-x-2'>Popularity</p>
        <p className='text-white'>{details.popularity}</p>
      </div>
      </div>
    <div className='flex gap-5'>
      <img
        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
        alt={details.title}
        className='w-68 h-96'
      />

 {videos.length > 0 && (
        <>
          {videos.slice(0,1).map(video => (
            <iframe
              key={video.id}
              className='w-1/2 h-96'
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allowFullScreen
            ></iframe>
          ))}
        </>
      )}


      </div>
      <div className='py-4'>
        <p className='text-white w-3/4 text-justify font-semibold'>{details.overview}</p>

      </div>
      </div>
      <div className='bg-white h-[1500px] w-screen' >
      {/* {
  images.length > 0 && (
    <>
      {
        images.slice(0,1).map(image => (
          <img
            key={image.file_path}
            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
            alt="Backdrop"
            className="w-96 h-80 rounded-lg shadow-md"
          />
        ))
      }
    </>
  )
} */}

      {/* {credits && (
        <>
          <h3>Cast:</h3>
          <ul>
            {credits.cast.slice(0, 5).map(member => (
              <li key={member.id}>{member.name} as {member.character}</li>
            ))}
          </ul>
        </>
      )} */}

        <div>
          <div className='relative left-14 top-6 '>
            <button className='text-black text-2xl font-bold' ><span className="h-24 border-2 border-yellow-400 rounded-3xl "></span><div className='inline-block text-3xl relative left-2'>Videos</div> <span className='text-slate-500 relative left-2 '>&gt;</span></button>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 relative top-14 h-[600px] left-14 w-[800px]">
          {videos.length > 0 &&
            videos.slice(2, 4).map((video) => (
              <iframe
                key={video.id}
                className="w-full h-full rounded-lg shadow-md object-cover mx-2"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )) || <div>no video found</div>}
            <div className='flex w-48 h-48 gap-4'>
              {videos.length > 0 &&
            videos.slice(4, 8).map((video) => (
              <iframe
                key={video.id}
                className="w-full h-full rounded-lg shadow-md object-cover"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )) || <div>no video found</div>}

            </div>
        </div>     
        <div>
          <div className='relative left-14 top-6 '>
            <button className='text-black text-2xl font-bold' ><span className="h-24 border-2 border-yellow-400 rounded-3xl "></span><div className='inline-block text-3xl relative left-2'>Images</div> <span className='text-slate-500 relative left-2 '>&gt;</span></button>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 relative top-14 h-[600px] left-14 w-[800px]">
             {
              images.length > 0 && (
                <>
                  {
                    images.slice(2,4).map(image => (
                      <img
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt="Backdrop"
                        className="w-96 h-80 rounded-lg shadow-md"
                      />
                    ))
                  }
                </>
              )|| <div>no images found</div>} 
            <div className='flex w-48 h-48 gap-4 relative top-5 left-0'>
              {
              images.length > 0 && (
                <>
                  {
                    images.slice(5,9).map(image => (
                      <img
                        key={image.file_path}
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt="Backdrop"
                        className="w-full h-full rounded-lg shadow-md"
                      />
                    ))
                  }
                </>
              )|| <div>no images found</div> 
            } 

            </div>
          </div>
        </div>
           <div>
            <div className='relative left-14 top-6 '>
            <button className='text-black text-2xl font-bold' ><span className="h-24 border-2 border-yellow-400 rounded-3xl "></span><div className='inline-block text-3xl relative left-2'>Casts</div> <span className='text-slate-500 relative left-2 '>&gt;</span></button>
      </div>
      <div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 relative top-14 h-full left-14 w-full">
        {credits && (
        <>
         
          <ul>
              {credits.cast.slice(0, 5).map(member => (
                <div key={member.id}>
                  
                  <li>{member.name} as {member.character}</li>
                </div>
              ))}
          </ul>
        </>
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
