type LoaderProps = {
    text?: string;
    isActive?: boolean;
  };
  
  const Loader = ({ text, isActive = false }: LoaderProps) => {
    return (
      <>
        {isActive && (
          <div>
            {text ? (
              <div className="loader">
                <div className="loader__text__container">
  
                Loading <span className="loader__text"> {text} </span>
                <span className="loader__dot loader__dot--first">.</span>
                <span className="loader__dot loader__dot--second">.</span>
                <span className="loader__dot loader__dot--third">.</span>
                </div>
              </div>
            ) : (
              <div className="loader">
                <span className="loader__spinner"></span>
              </div>
            )}
          </div>
        )}
      </>
    );
  };
  
  export default Loader;