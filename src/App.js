
import React,{useEffect, useState} from 'react'
import Movie from './components/Movie';
import './App.css';


const Featured_Api = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.decs&api_key=f7b19bf11253b0ebc77a2b7b62673e3e&page=1";


const Search_Api = "https://api.themoviedb.org/3/search/movie?&api_key=f7b19bf11253b0ebc77a2b7b62673e3e&query="
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTearm] = useState('')

  useEffect(() => {
    getMovies(Featured_Api)
  },[]);

  const getMovies = (API) => {
    fetch(API).then((res)=>res.json())
    .then((data)=>{
      setMovies(data.results);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(searchTerm){
      getMovies(Search_Api+searchTerm)
      setSearchTearm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTearm(e.target.value);
  }
  return (
    <>
    <header>
      <form onSubmit={handleSubmit}>
      <input type="search" 
      className='search'
       placeholder='Search...' onChange={handleOnChange}/>
      </form>
    </header>
    <div className='movie-container'>
      {movies.length > 0 && movies.map((movie)=>
        <Movie key={movie.id} {...movie} />)}
    </div>
    </>
  );
}
export default App;
