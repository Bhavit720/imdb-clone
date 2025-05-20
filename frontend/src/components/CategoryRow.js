// import MovieCard from "./MovieCard"
// export default function CategoryRow({title,movies}){
//     return(
//         <div>
//             <h2 className="text-xl font-bold mb-2">{title}</h2>
//             <div className="flex gap-4 w-screen overflow-x-scroll no-scrollbar p-4 bg-black rounded-2xl h-96 box-content">
//                 {
                   
//                     movies.map((movie) => {
//                     if (movie.backdrop_path) {
//                         return <MovieCard key={movie.id} movie={movie} />;
//                     } else {
//                         return null;
//                     }
//                     })                }
//             </div>
//         </div>
//     )
// }