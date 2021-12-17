import React, { useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Movie from "./Movie";
import "../styles/navbar.css";
import Navbar from "./Navbar";

export default function Movies() {
  const [movies, setMovies] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    Axios.get("https://rmcmillan.co.uk/api/getMovies")
      .then((response) => {
        setMovies(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (loading) {
    return "loading...";
  } else {
    return (
      <div style={{overflow: "hidden"}}>
        <Navbar/>
        <Grid container justifyContent="center" spacing={4}>
          {movies &&
            movies.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <Movie movie={movie} />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
