import React, { useEffect, useState } from "react";
import Axios from "axios";

function Test() {
  const [movies, setMovies] = useState("");

  useEffect(() => {
    Axios.post("https://rmcmillan.co.uk/api/getUserMovieRating", ).then((response) => {
        console.log(response);
      });
  }, []);

  
    
    

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
export default Test;
