type ButtonProps= {
    onClick: () => void;
    text?:string;
    floating?:boolean;
    icon?:JSX.Element;
}
const Button = ({icon,floating=false,onClick,text="Click"}:ButtonProps) => {
  return (
    <div>
        {floating ? <button className="btn btn__floating" onClick={onClick}>{icon}</button>:
        <button className="btn btn__regular" onClick={onClick}>{text}</button>}

    </div>
    
  )
}

export default Button