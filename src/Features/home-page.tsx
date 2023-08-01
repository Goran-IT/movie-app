import { useEffect, useState } from "react"
import Container from "../Components/container"
import Button from "../Components/button";
import ShuffleIcon from "../assets/Icons/shuffle";

type MovieType= {
    id:number;
    title:string
    poster_path:string;
    overview:string;
    original_language:string;
    release_date:string;
}

const Home = () => {
    const[showItems, setShowItems] = useState<number>(6)
    const[page, setPage] = useState<number>(1)
    const[movieList, setMovieList] = useState<MovieType[]>([])


    const getMovies =()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?&page=${page}&api_key=7738e7b9be22e4b0e4100288a6c6eb83`,{
            method:"GET",
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzM4ZTdiOWJlMjJlNGIwZTQxMDAyODhhNmM2ZWI4MyIsInN1YiI6IjY0YzhkZWRiZDUxOTFmMDBjNTJhMjMzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uyRlzB8G1p5Jp1rHQhm2SRYHSkQsKTNmeFA6xQCD8Z0'
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

useEffect(()=>{
    getMovies()
},[showItems,page])

  return (
    <>
        <Container>
            <div className="movie__container">
            {movieList.map((movie)=>{
                return <div className="movie__card" key={movie.id}>
                    <img className="movie__card__poster" src={`https://image.tmdb.org/t/p/w200/`+movie.poster_path} />
                    <h1>{movie.title} ({movie.release_date.slice(0,4)})</h1>
                    <h3>Language: {movie.original_language}</h3>
                    </div>
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
        </Container>
    </>
  )
}

export default Home