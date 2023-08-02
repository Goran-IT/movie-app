import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MovieType, apiKey, apiToken } from "./home-page"
import Loader from "../Components/loader"
import StarRating from "../Components/star-rating"




const MovieDetails = () => {
    const {movieId} = useParams()
    const [movie, setMovie] = useState<MovieType | null>(null)
    const [rating, setRating] = useState<number>(() => {
        const storedRating = localStorage.getItem(movieId || "");
        return storedRating ? parseInt(storedRating) : 0;
      });

      const handleRatingChange = (newRating: number) => {
        setRating(newRating);
      };

    const getMovie =(movieId:string)=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,{
            method:"GET",
            headers: {
                accept: 'application/json',
                Authorization: apiToken
            }
        })
        .then((res)=> res.json()
        )
        .then(data=>{
           //console.log(data)
            setMovie(data)
            setRating((prevRating) => prevRating || Math.floor(data.vote_average));
        })
        .catch((err)=>console.log(err))
    }

    useEffect(() => {
        if (movieId) {
          getMovie(movieId);
        }
    }, []);

      useEffect(() => {
        if(movieId && rating > 0){
            localStorage.setItem(movieId, rating.toString());
        }
      }, [rating, movieId]);

  return (<> 
  {movie===null ? <div><Loader isActive={true}/>dd</div> : 
     <div className="details">
        <h1>{movie.title} ({movie?.release_date.slice(0,4)})</h1>
        <div className="details__background" style={{backgroundImage:`url(https://image.tmdb.org/t/p/w200/${movie.backdrop_path})`}}>
            <div className="details__background__text">
                <p>{movie?.overview}</p>
            </div>
            <div className="details__rating">
            <StarRating rating={rating} onRatingChange={handleRatingChange} />
            </div>
        </div>
        <h2>Rating: <span>{movie.vote_average.toString().slice(0,1)} Stars</span></h2>
        <h2>Popularity: <span>{movie.popularity}</span></h2>
        <h2>Language: <span>{movie.original_language}</span></h2>


        <h2> Production Companies: {movie.production_companies.map((company, index)=>{
            return <span key={company.id}>
                {company.name}
                {index < company.name.length -1 && ", " }
            </span>
        })}</h2>


    </div>
   }
    </>

  )
}

export default MovieDetails