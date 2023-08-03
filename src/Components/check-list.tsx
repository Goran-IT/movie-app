import Button from "./button";
import {useState} from "react"
type GenreType={
    label:string;
    id:number;
}

const genreList:GenreType[]=[
    {
        label:"Action",
        id:28,
    },
    {
        label:"Adventure",
        id:12,
    },
    {
        label:"Animation",
        id: 16,
    },
    {
        label:"Comedy",
        id:35,
    },
    {
        label:"Crime",
        id:80,
    },
    {
        label:"Documentary",
        id:99,
    },
    {
        label:"Drama",
        id: 18,
    },
    {
        label:"Horror",
        id:27,
    },
    {
        label:"Romance",
        id: 10749,
    },
    {
        label:"War",
        id: 10752,
    },
    {
        label:"Western",
        id:37,
    },
    {
        label:"Family",
        id: 10751,
    },
]

type CheckListProps={
    onSubmit:(id:number)=>void
}

const CheckList = ({onSubmit}:CheckListProps) => {
    const [openGenres,setOpenGenres] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false)
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [currentGenre, setCurrenGenre] = useState<string>("");
    
    const toggleGenreModal=()=>{
        setOpenGenres(!openGenres)
        setError(false)
    }

    const handleCheckboxChange = (genre: number,label:string) => {
      setSelectedGenre(genre);
      setCurrenGenre(label)
    };
  
    const handleSubmit = () => {
      if (selectedGenre) {
        onSubmit(selectedGenre);
        toggleGenreModal()
      } else {
        setError(true)
      }
    };
  return (
    <>
    <Button text="Select Genre" onClick={()=>toggleGenreModal()}/>

    <span className="modal__text">
    {currentGenre && `Selected Genre: ${currentGenre}`}
    </span>

    {openGenres && 
    <div>
        <div onClick={()=>toggleGenreModal()}  className="modal__layout"/>

        <div className="modal">
            <h1>Select Genre</h1>

            <div>
            {genreList.map((genre)=>{
                return <div key={genre.id} className="modal__option">
                    <input
                    type="radio"
                    value={genre.id}
                    id={genre.label}
                    checked={selectedGenre===genre.id}
                    onChange={()=>handleCheckboxChange(genre.id,genre.label)} />
                    <label htmlFor={genre.label}>{genre.label}</label>
                </div>
            })}
            </div>

            <Button text="Roll" onClick={()=>{handleSubmit()}}/><br />
            
            {error && <span className="modal__text--red">Select Genre to Continue*</span> }
        </div>
    </div>
    }
    </>
  )
}

export default CheckList