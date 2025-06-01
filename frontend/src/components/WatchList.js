import { useContext, useState, useRef, useEffect } from "react";
import { SavedContext } from "../context";
import { ArrowDownIcon, ArrowUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";

export default function WatchList() {
    const { savedItems,removeData } = useContext(SavedContext);
    const [sortOrder, setSortOrder] = useState("index");
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [data, setData] = useState(savedItems);
    const [descending, setDescending] = useState(false);
    const [grid, setGrid] = useState(false);
    const navigate = useNavigate();
   
    useEffect(() => {
        const uniqueItemsMap = new Map();
        savedItems.forEach((item, index) => {
            if (!uniqueItemsMap.has(item.id)) {
                uniqueItemsMap.set(item.id, { ...item, originalIndex: index });
            }
        });

        let sorted = Array.from(uniqueItemsMap.values());

        if (sortOrder === "rating") {
            sorted.sort((a, b) =>
                descending
                    ? b.vote_average - a.vote_average
                    : a.vote_average - b.vote_average
            );
        } else if (sortOrder === "popularity") {
            sorted.sort((a, b) =>
                descending
                    ? Math.floor(b.popularity) - Math.floor(a.popularity)
                    : Math.floor(a.popularity) - Math.floor(b.popularity)
            );
        } else if (sortOrder === "index") {
            sorted.sort((a, b) =>
                descending
                    ? b.originalIndex - a.originalIndex
                    : a.originalIndex - b.originalIndex
            );
        }

        setData(sorted);
    }, [sortOrder, savedItems, descending]);

    const handleSelect = (movie) => {
        navigate(`/moviedetails/${movie.id}`);
    };

    return (
        <div className=" bg-white min-h-[100px] pb-8">
            {/* Top Banner */}
            <div className="bg-black md:w-full min-h-[200px]">
                <div className="relative left-14 top-6">
                    <h1 className="text-white text-5xl relative top-15">Your WatchList</h1>
                    <p className="text-white text-justify md:w-[900px] sm:w-[600px] py-4 relative left-1">
                        Your Watchlist is the place to track the titles you want to watch. You can sort your Watchlist by the IMDb rating or popularity score and arrange your titles in the order you want to see them.
                    </p>
                </div>
            </div>

            {/* Top Controls */}
            <div className="relative left-14  top-2 md:w-2/3 min-h-fit sm:w-[600px] ">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <p className="font-medium">
                        {data.length} {data.length === 1 ? 'title' : 'titles'}
                    </p>

                    <div className="flex items-center gap-6 flex-wrap">
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

                        <div className="flex items-center gap-2">
                            <button className="hover:rounded-full w-6 h-6" onClick={() => setGrid(!grid)}>
                                <img src="/images/image.png" alt="grid-view" />
                            </button>
                            <button className="hover:rounded-full w-6 h-6" onClick={() => setGrid(false)}>
                                <img src="/images/compact image.png" alt="compact-view" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Watchlist Rendering */}
            {data.length === 0 ? (
                <div className="w-2/3 min-h-fit relative left-14 top-10 text-center p-6  border border-dashed border-gray-400 rounded-md bg-gray-50 mb-4">
                    <p className="text-lg font-semibold text-gray-600">No watchlist created</p>
                    <p className="text-sm text-gray-500 ">Add movies to your watchlist to view them here.</p>
                </div>
            ) : (
                <div
                    className={`md:w-2/3 min-h-fit relative left-14 bottom-2 sm:w-[600px]  ${grid ? "mt-6" : "top-6 border-2 border-slate-300 min-h-1 rounded-md overflow-visible"}`}
                >
                    <div className={grid ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6" : ""}>
                        {data.map((saved, index) => (
                            <div
                                key={index}
                                className={
                                    grid
                                        ? "bg-white border border-slate-300 rounded-lg shadow-md flex flex-col relative"
                                        : `flex gap-4 items-center relative top-2 py-3 ${index !== data.length - 1 ? "border-b border-gray-300 my-1" : ""}`
                                }
                            >
                                
                                <div className={grid ? "" : "relative left-3"}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${saved.poster_path}`}
                                        alt={saved.title}
                                        className={grid ? "w-full h-60 object-cover rounded-md mb-3" : "w-30 h-28 object-cover rounded-lg"}
                                    />
                                </div>

                                <div className={grid ? "flex flex-col gap-1 px-3 relative h-48" : "relative bottom-1 left-3"}>
                                    <p className={grid ? "text-sm text-gray-600" : ""}>
                                        ⭐ {saved.vote_average} ({saved.popularity ?? 'N/A'})
                                    </p>
                                    <h1 className={`font-bold ${grid ? "text-lg text-gray-800" : "text-black"}`}>
                                        <span>{index + 1}. </span>
                                        {saved.title}
                                    </h1>
                                    <p className={grid ? "text-sm text-gray-600 absolute bottom-14" : ""}>📅 {saved.release_date}</p>

                                    <button
                                        className={`${
                                            grid
                                                ? "bg-gray-200 rounded-2xl w-44 h-8 text-blue-600 hover:bg-blue-100 absolute bottom-3 md:left-4 sm:left-16"
                                                : "bg-gray-200 rounded-2xl w-44 h-8 text-blue-600 hover:bg-blue-300 hover:text-white"
                                        }`}
                                        onClick={() => handleSelect(saved)}
                                    >
                                        Watch Details
                                    </button>
                                </div>
                                <div className={`${grid?"absolute top-0":"absolute right-2  top-4  "}`}>
                                    <button className="" onClick={() => removeData(saved)}>
                                        <XMarkIcon className="w-5 h-5"/>
                                    </button>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
