import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WatchList from './components/WatchList'
import MovieDetailsPage from './pages/MovieDetails';
import { SavedProvider } from './context';
export default function App(){
  return(
    <div className='bg-black w-screen overflow-hidden scrollbar-x-hide'>
    <Router>
      <Navbar />
     <SavedProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails/:id" element={<MovieDetailsPage/>}/>
        <Route path="/watchlist" element={<WatchList/>}/>
      </Routes>
      </SavedProvider>
    </Router>

    </div>
  )
}

