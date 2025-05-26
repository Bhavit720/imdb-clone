import { useContext } from "react";
import { SavedContext } from "../context";

export default function WatchList(){
    const {savedItems} = useContext(SavedContext);
    console.log(savedItems)
    return(
        <div className="w-screen min-h-[800px] bg-white ">
            <div className="bg-black w-full h-[200px]" >
                <div className="relative left-14 top-6">
                 <h1 className="text-white text-5xl relative top-15">Your WatchList</h1>
                <p className="text-white text-justify w-[900px] py-4 relative left-1">Your Watchlist is the place to track the titles you want to watch. You can sort your Watchlist by the IMDb rating or popularity score and arrange your titles in the order you want to see them.</p>

                </div>
            </div>
            <div className="relative left-14 p-2 top-2">
                <p className="font-medium">{savedItems.length} {savedItems.length===1?'title':'titles'}</p>
            </div>
                <div className="border-2 border-slate-300 min-h-1 w-2/3 rounded-md relative left-14 top-6 overflow-visible ">
                {
                    savedItems.map((saved, index) => (
                    <div
                        key={index}
                        className={`flex gap-4 items-center relative top-2 py-3 ${index !== savedItems.length - 1 ? 'border-b border-gray-300 my-1' : ''}`}
                    >
                        <div className="relative left-3">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${saved.poster_path}`}
                            alt={saved.title}
                            className="w-30 h-28 object-cover rounded-lg"
                        />
                        </div>

                        <div className="relative bottom-3 left-3">
                        <h1 className="text-black font-bold"><span>{index + 1}. </span>{saved.title}</h1>
                        <p>{saved.release_date} </p>
                        <p>{saved.runtime ?? 'N/A'}</p>
                        <p>⭐ {saved.vote_average} &#40;{saved.popularity ?? 'N/A'} &#41;</p>
                       
                        </div>
                    </div>
                    ))
                }
                </div>
            
        </div>
    )
}