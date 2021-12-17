import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";
import UrlImageDownloader from "react-url-image-downloader";
import Modal from "./Modal";
import Heart from "react-heart";
import axios from "axios";
import "../styles/navbar.css";


const Movie = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isclick, setClick] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const classes = useStyles();
 
  useEffect(() => {
    const movieID = {
      MovieID: movie.id
    };
    axios.post("http://rmcmillan.co.uk/checkIfOnWishlist", {movieID})
    .then((response)=>{
      setClick(response.data.onList)
    })
    axios.post("http://rmcmillan.co.uk/getAvgRating", {movieID})
    .then((response)=>{
      setAvgRating(response.data.avgRating)
    })
    axios.post("http://rmcmillan.co.uk/getUserMovieRating", {movieID})
    .then((response)=>{
      console.log(response.data.userRating)
      setUserRating(response.data.userRating)
    })
  },[])

  const updateClick = () => {
    if (isclick) {
      console.log("deleting");
      //remove from WishList
      axios
        .delete("/removeWatchList", {
          data: {
            id: movie.id,
          },
        })
        .then((res) => {
          console.log(res);
          //window.location.reload(false);
        });
    } else {
      //add to wishList
      const article = { movieID: movie.id };
      axios.put("/addToWishList", article).then((res) => console.log(res));
    }
    setClick(!isclick);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.cardcontent}>
          <Typography variant="h5">{movie.title}</Typography>
          <UrlImageDownloader
            imageUrl={"http://rmcmillan.co.uk/images/" + movie.url}
          ></UrlImageDownloader>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <ReactStars
              value={movie.criticRating}
              count={5}
              size={48}
              isHalf={true}
              activeColor="#ffd700"
              edit={false}
            />
            
            <Button onClick={() => setIsOpen(true)}>More Info</Button>
            <div style={{ width: "2rem" }}>
            <Heart isActive={isclick} onClick={updateClick} />
</div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <Typography variant="h3">{movie.title}</Typography>
              <div className="iframe-container">
                <iframe
                  src={"https://www.youtube.com/embed/" + movie.trailer}
                  title="YouTube video player"
                  frameBorder="0"
                  justifycontent="center"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <br></br>
              <Typography variant="h5">About</Typography>
              <p>{movie.description}</p>
              <br></br>
              <Grid container justifyContent="center" spacing={4}>
                <Grid key={movie.id+1} item xs={12} sm={4} md={4} lg={4}>
                  <Typography variant="h5">Metacritic rating</Typography>
                  <ReactStars
                    value={movie.criticRating}
                    count={10}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </Grid>
                <Grid key={movie.id+2} item xs={12} sm={4} md={4} lg={4}>
                  <Typography variant="h5">User rating</Typography>
                  <ReactStars
                    value={avgRating}
                    count={10}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    edit={false}
                    justify="space-evenly"
                    alignItems="center"
                  />
                </Grid>
                <Grid key={movie.id+3} item xs={12} sm={4} md={4} lg={4}>
                  <Typography variant="h5">Your rating</Typography>
                  <ReactStars
                    value={userRating}
                    count={10}
                    size={24}
                    isHalf={true}
                    activeColor="#ffd700"
                    edit={true}
                  />
                </Grid>
              </Grid>
            </Modal>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};
export default Movie;