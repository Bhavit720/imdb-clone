import { useState }  from "react";

export default function SearchResults(){
    const[search,setSearch] = useState("");
    return(
        <div className="relative left-40">
            <input type="text" placeholder="Search IMDB" value={search} onChange={(e) => setSearch(e.target.value)} className="w-96 h-10 rounded-lg bg-white text-black p-2 "/>
        </div>
    )
}