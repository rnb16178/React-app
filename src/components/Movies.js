import React, { useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Movie from "./Movie";
import "../styles/navbar.css";

export default function Movies() {
  const [movies, setMovies] = useState("");

  useEffect(()=>{
    Axios.get("http://rmcmillan.co.uk/getMovies", {
      
    }).then((response) => {
      console.log(response)
      setMovies(response.data.data)
    })
    
  },[]);

  
  return  (<div>
  <Grid container justifyContent="center" spacing={4}>
    {movies &&
      movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
          <Movie movie={movie} />
        </Grid>
      ))}
  </Grid></div>);
}
