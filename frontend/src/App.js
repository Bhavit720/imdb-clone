import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WatchList from './components/WatchList'
import MovieDetailsPage from './pages/MovieDetails';
import { SavedProvider } from './context';
import AllVideos from './pages/AllVideos';
import AllImages from './pages/AllImages';
import AllCast from './pages/AllCasts';
export default function App(){
  return(
    <div className='bg-black max-w-[100%]  overflow-hidden scrollbar-x-hide'>
    <Router>
      
     <SavedProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetailsPage/>}/>
        <Route path="/watchlist" element={<WatchList/>}/>
        <Route path="/AllVideos/:id" element={<AllVideos/>}/>
        <Route path='/AllImages/:id' element={<AllImages/>}/>
        <Route path='/AllCasts/:id' element={<AllCast/>}/>
      </Routes>
      </SavedProvider>
    </Router>

    </div>
  )
}

