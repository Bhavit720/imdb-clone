import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMoviesImages,
} from '../services/movieService';
import '@fontsource/roboto';

export default function AllCast() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [sortOrder, setSortOrder] = useState("index");
  const [isOpen, setIsOpen] = useState(false);
  const [crew, setCrew] = useState([]);
  const selectRef = useRef(null);

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

  const Director = crew?.filter(person => person.job === "Director");
  const Writer = crew?.filter(person => person.job === "Writer");
  const Composer = crew?.filter(person => person.job === "Original Music Composer");
  const Producer = crew?.filter(person => person.job === "Executive Producer" && "Co-Producer" && "Producer")
  const Editor = crew?.filter(person => person.job ===  "Editor")
  const visualEffects = crew?.filter(person => person.job ===  "Visual Effects Supervisor")
   const Stunts = crew?.filter(person => person.job ===  "Stunts")
  if (!details) return <div>Loading movie details...</div>;

  const handleSelect = (e) => {
    const id = e.target.value;
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white min-h-[100vh] pb-10">

      {/* Header Section */}
      <div className="bg-black w-full min-h-[200px]">
        <Link to={`/moviedetails/${details.id}`}>
          <p className="text-white relative left-14 text-lg top-4 hover:underline">
            <span className="mr-2">&lt;</span>Back
          </p>
        </Link>

        <div className="flex gap-2 relative left-14 top-14">
          <img
            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
            alt={details.title}
            className="w-30 h-28 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-24">
            <h1 className="text-gray-300 font-bold text-[20px]">{details.title}</h1>
            <p className="text-white text-[36px]">Cast and Crew</p>
          </div>
        </div>
      </div>

      {/* Dropdown Section */}
      <div className="relative left-14 p-2 top-2 w-2/3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
                <select
                ref={selectRef}
                value={sortOrder}
                onChange={(e) => handleSelect(e)}
                onMouseDown={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                className={`h-8 w-28 font-medium bg-white border-none rounded cursor-pointer transition duration-200
                    focus:border-dotted focus:border-2 focus:border-blue-400 
                    ${!isOpen ? "hover:bg-blue-400 active:bg-blue-600 hover:text-white text-blue-500" : "text-black"}`}
                style={{ outline: "none" }}
                >
                <option value="Director">Director</option>
                <option value="Writers">Writers</option>
                <option value="Casts">Casts</option>
                <option value="Producers">Producers</option>
                <option value="Composer">Composer</option>
                <option value="Editor">Editor</option>
                <option value="Visual Effects">Visual Effects</option>
                <option value="Stunts">Stunts</option>
                </select>        
            </div>
      </div>

      
      <div className="relative left-14 top-6">
        <h1 className="text-black text-2xl font-bold">
          <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
          <div className="inline-block text-3xl relative left-2" id="Director">Director</div>
        </h1>
        <div className="mt-4">
                {Director.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Director.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No director info available.</p>
                )}  

            <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id="Writers">Writers</div>
             </h1>

                {Writer.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Writer.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Writer info available.</p>
                )}  
            
            <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id="Casts">Casts</div>
             </h1>
                {credits?.cast?.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {credits?.cast.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td>
                                <img
                                 src={
                                      person.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                                        : '/images/noProfile.jpg'
                                    }
                                alt={person.name}
                                className="w-8 h-8 rounded-full shadow-md"
                                />
                            </td>
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.character}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Casts info available.</p>
                )}  

            <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id="Producers">Producers</div>
             </h1>

                {Producer.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Producer.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Producer info available.</p>
                )}  


            <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id='Composer'>Composer</div>
             </h1>
                
                {Composer.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Composer.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Composer info available.</p>
                )}  
            
            
            <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id="Editor">Editor</div>
             </h1>
            
                {Editor.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Editor.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Editor info available.</p>
                )}  

              <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id='Visual Effects'>Visual Effects</div>
             </h1>
              
                {visualEffects.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {visualEffects.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Visual Effects info available.</p>
                )}  

               <h1 className="text-black text-2xl font-bold mt-5">
                <span className="h-24 border-2 border-yellow-400 rounded-3xl"></span>
                <div className="inline-block text-3xl relative left-2" id='Stunts'>Stunts</div>
             </h1>

              {Stunts.length > 0 ? (
                    <table className="md:w-[92%] sm:min-w-[100px] text-left border border-gray-300 rounded-md overflow-hidden shadow-md ring-1 ring-gray-200 mt-4">
                    <tbody>
                        {Stunts.map((person, index) => (
                        <tr
                            key={person.id}
                            className="odd:bg-gray-100 even:bg-white text-black"
                        >
                            <td className="px-4 py-2 text-blue-500 font-bold">{person.name}</td>
                            <td className="md:px-56">{person.department}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No Stunts info available.</p>
                )}  


        </div>
      </div>
    </div>
  );
}
