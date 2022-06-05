import React from 'react'

const Img_api = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
    if(vote >= 8){
        return 'green'
    }else if(vote >= 6){
        return 'orange'
    }else{
        return 'red';
    }
}
const Movie = ({title, poster_path, overview, vote_average}) => (

    <div className='movie'>
        <img src={poster_path ? Img_api + poster_path : "https://www.bloopanimation.com/wp-content/uploads/2018/05/making-a-film-yourself.jpg"} alt={title}/>
        <div className="movie-info">
            <h3>{title}</h3>
            <span className={`tag ${setVoteClass(vote_average)}`}>{vote_average}</span>
        </div>

        <div className = "movie-over">
            <h2>Overview:</h2>
            <p>{overview}</p>
        </div>

    </div>
  );
export default Movie;
