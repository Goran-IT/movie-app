import {useState,useEffect} from "react"

type SearchProps={
    value:string;
    onSearch:(e:string)=>void;
    removeText:()=>void;
}
const Search = ({value,onSearch,removeText}:SearchProps) => {
    const [results,setResults]=useState<boolean>(false)
    const [removeResult,setRemoveResult]=useState<boolean>(false)

    const toggleResults = (event:any)=>{
        if(event.code ==="Enter"){
            setResults(!results)
        }
    }
    useEffect(() => {
      if(value!==""){
        setRemoveResult(true)
      } else {
        setRemoveResult(false)
      }
    }, [value])
    
  

  return (
    <>
    <div className="movie--search">
        <div className="movie--search--relative">
        {removeResult && 
    <button className='movie--search__remove' onClick={removeText}>&#10005;</button>
    }
        <input
        type="text"
        placeholder="Search"
        value={value}
        onKeyDown={(e)=>toggleResults(e)}
        onChange={(e)=>onSearch(e.target.value)}
        />
        </div>
    </div>
    </>
  )
}

export default Search