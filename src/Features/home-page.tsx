import { useEffect, useState } from "react"
import Container from "../Components/container"
import Button from "../Components/button";
import ShuffleIcon from "../assets/Icons/shuffle";
import { NavLink } from "react-router-dom";

export type CompaniesType ={
    id:number;
    name:string
}
export type MovieType = {
    id:number;
    title:string
    poster_path:string;
    overview:string;
    original_language:string;
    release_date:string;
    backdrop_path:string;
    popularity:number;
    vote_average:number;
    production_companies:CompaniesType[];
}
export const apiKey = import.meta.env.VITE_API_KEY
export const apiToken = import.meta.env.VITE_API_TOKEN

const Home = () => {
    const[movieList, setMovieList] = useState<MovieType[]>([])
    const[showItems, setShowItems] = useState<number>(6)
    const[page, setPage] = useState<number>(() => {
        const storedPage = localStorage.getItem("lastPage");
        return storedPage ? parseInt(storedPage) : 1;
      })

    const getMovies =()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?&page=${page}&api_key=${apiKey}`,{
            method:"GET",
            headers: {
                accept: 'application/json',
                Authorization: apiToken
            }
        })
        .then((res)=> res.json()
        )
        .then(data=>{
           // console.log(data.results)
            setMovieList(data.results.slice(0,showItems))
        })
        .catch((err)=>console.log(err))
    }

    const randomNumber = (min:number, max:number) => {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        setPage(number)
        setShowItems(6)
        window.scroll({
            behavior:"instant",
            top:0
        })
    };
    const handleResetLocalStorage = () => {
        localStorage.clear();
        window.location.reload()
      };

useEffect(()=>{
    getMovies()
    localStorage.setItem("lastPage", page.toString());
},[showItems,page])

  return (
    <>
        <Container>
            
            <div className="movie__container">
            {movieList.map((movie)=>{
                return <NavLink to={`/movie/${movie.id}`} className="movie__card" key={movie.id}>
                    <img className="movie__card__poster" src={`https://image.tmdb.org/t/p/w200/`+movie.poster_path} alt={`Poster of ${movie.title}`} />
                    <h1>{movie.title} ({movie.release_date.slice(0,4)})</h1>
                    <h3>Rating: {Math.floor(movie.vote_average)} Stars</h3>
                    <h3>Language: {movie.original_language}</h3>
                    </NavLink>
                })}
            </div>
            <div className="movie__container__fotter">
                {showItems >=22 ? "" : <Button text="More" onClick={()=> setShowItems(showItems+6)}/>}
            </div>
            <Button floating icon={<ShuffleIcon/>} onClick={()=>randomNumber(1, 500)} />
           <div className="pagination">
                 <button disabled={page<=1} onClick={()=>setPage(page-1)}>&#60; Previous Page</button>
                 <button disabled={page>=500} onClick={()=>setPage(page+1)}>Next Page &#62;</button>
            </div>
        <Button onClick={handleResetLocalStorage} text="Reset Application"/>
        </Container>
    </>
  )
}

export default Home