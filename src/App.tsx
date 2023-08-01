import {Routes, Route} from "react-router-dom"
import Home from "./Features/home-page"
import Layout from "./Components/layout"
const App = () => {


  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>

    </Routes>
    </>
  )
}

export default App
