import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import useStyles from "./styles";
import Box from "@material-ui/core/Box";
import Modal from "./Modal.js";
import Heart from "react-heart";
import axios from "axios";
import "../styles/navbar.css";

const Movie = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isclick, setClick] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const classes = useStyles();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let requests = [];
    let two = "https://rmcmillan.co.uk/api/getAvgRating";
    const reqTwo = axios.post(two, {
      movieID: movie.id,
    });
    requests.push(reqTwo);
    if (isLoggedIn) {
      let one = "https://rmcmillan.co.uk/api/checkIfOnWishlist";
      let three = "https://rmcmillan.co.uk/api/getUserMovieRating";
      const reqOne = axios.post(one, {
        userID: localStorage.getItem("userID"),
        movieID: movie.id,
      });
      const reqThree = axios.post(three, {
        MovieID: movie.id,
        UserID: localStorage.getItem("userID"),
      });
      requests.push(reqOne);
      requests.push(reqThree);
    }

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          const avgRating = responses[0].data.avgRating;
          setAvgRating(avgRating);
          if (isLoggedIn) {
            const onWatchlist = responses[1].data.onList;
            setClick(onWatchlist);
            const userMovieRating = responses[2].data.userRating;
            setUserRating(userMovieRating);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  
  const updateClick = () => {
    if (isclick) {
      //remove from WishList
      axios.delete("https://rmcmillan.co.uk/api/removeWatchList", {
        data: {
          userID: localStorage.getItem("userID"),
          id: movie.id,
        },
      });
    } else {
      //add to wishList
      const article = {
        movieID: movie.id,
        userID: localStorage.getItem("userID"),
      };
      axios.put("https://rmcmillan.co.uk/api/addToWishList", article);
    }
    setClick(!isclick);
  };


  if (loading) {
    return "Loading...";
  } else {
    return (
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.cardcontent}>
            <Typography variant="h5">{movie.title}</Typography>
            <img src={"https://rmcmillan.co.uk/api/images/"+movie.url} width="100%" />

            <Box component="fieldset" mb={3} borderColor="transparent">
              <ReactStars
                value={movie.criticRating/2}
                count={5}
                size={48}
                isHalf={true}
                activeColor="#ffd700"
                edit={false}
              />
              <Button onClick={() => setIsOpen(true)}>More Info</Button>
              {isLoggedIn ? (
                <div style={{ width: "2rem" }}>
                  <Heart isActive={isclick} onClick={updateClick} />
                </div>
              ) : (
                <></>
              )}
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Typography variant="h5">{movie.title}</Typography>
                <div className="iframe-container" style={{maxWidth: "750px"}}>
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
                  <Grid key={movie.id + 1} item xs={6} sm={6} md={6} lg={6}>
                    <Typography variant="h5">Critic rating</Typography>
                    <ReactStars
                      value={movie.criticRating/2}
                      count={5}
                      size={24}
                      isHalf={true}
                      activeColor="#ffd700"
                      edit={false}
                    />
                  </Grid>
                    <>
                      <Grid
                        key={movie.id + 2}
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                      >
                        <Typography variant="h5">User rating</Typography>
                        <ReactStars
                          value={avgRating/2}
                          count={5}
                          size={24}
                          isHalf={true}
                          activeColor="#ffd700"
                          edit={false}
                          justify="space-evenly"
                          alignItems="center"
                        />
                      </Grid>
                      
                    </>
                  
                </Grid>
              </Modal>
            </Box>
          </div>
        </CardContent>
      </Card>
    );
  }
};
export default Movie;
