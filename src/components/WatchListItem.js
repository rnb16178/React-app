import React from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import useStyles from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const WatchListItem = ({ item }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const removeWishItem = (movie) => {
    axios
      .post("https://rmcmillan.co.uk/api/removeWatchListByID", {
        userID: localStorage.getItem("userID"),
        id: movie.MovieID,
      })
      .then((res) => {
        navigate("/");
      });
  };
  return (
    <div>
      <div>
        <Card className={classes.root}>
          <CardContent ><div style={{width:'250px'}}>
            <Typography variant="h5"><img src={"https://rmcmillan.co.uk/api/images/"+item.url} width="100%" />{item.title}</Typography></div>
          </CardContent>
          <Button
            onClick={(e) => {
              removeWishItem(item);
            }}
          >
            Remove item
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default WatchListItem;
