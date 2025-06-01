import MovieCard from "./MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

export default function CategoryRow({title,movies}){
    let rowRef = useRef(null);
    const scrollLeft = () =>{
        if(rowRef.current){
            rowRef.current.scrollBy({
                left:-400,
                behavior:"smooth"
            })
        }
    }

        const scrollRight = () =>{
        if(rowRef.current){
            rowRef.current.scrollBy({
                left:400,
                behavior:"smooth"
            })
        }
    }

    return(
        <div className="relative">
            <h2 className="text-2xl font-bold mb-2 text-white relative left-3 flex gap-3"><span className="border-2 border-yellow-400 rounded-lg"></span>{title}</h2>
            
            <div className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-[498px] box-border " ref={rowRef}>
                
                {
                   
                    movies.map((movie) => {
                    if (movie.backdrop_path) {
                        return <MovieCard key={movie.id} movie={movie} />;
                        
                    } else {
                        return null;
                    }
                    })                
                    
                    }

                    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-1 rounded-full p-2 hover:bg-opacity-75" onClick={scrollLeft}>
                    <ChevronLeftIcon className="w-6 h-6 text-black font-extrabold"/>
                    </button>
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-1 rounded-full p-2 hover:bg-opacity-75" onClick={scrollRight}>
                    <ChevronRightIcon className="w-6 h-6 text-black font-extrabold"/>
                    </button>

            </div>
        </div>
    )
}