import {Routes, Route} from "react-router-dom"
import Home from "./Features/home-page"
import Layout from "./Components/layout"
import MovieDetails from "./Features/movie-details"
const App = () => {


  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/movie/:movieId" element={<MovieDetails/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
