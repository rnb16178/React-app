import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import axios from "axios";
import UrlImageDownloader from "react-url-image-downloader";


const WatchListItem = ({ item }) => {
  const classes = useStyles();
  const style = {
    width: '150px'
  };
  const removeWishItem = (movie) => {
    console.log(movie)
    axios
      .post("/removeWatchListByID", {
        userID: localStorage.getItem("userID"),
        id: movie.MovieID,
      })
      .then((res) => {
        console.log(res);
        //window.location.reload(false);
      });
  };
  return (
    <div>
      <div>
        <Card className={classes.root}>
          <CardContent><div style={{width:'150px'}}>
            <Typography variant="h5"><UrlImageDownloader
            imageUrl={"/images/" + item.url
          }
          ></UrlImageDownloader>{item.title}</Typography></div>
          </CardContent>
          <button
            onClick={(e) => {
              removeWishItem(item);
            }}
          >
            Remove item
          </button>
        </Card>
      </div>
    </div>
  );
};
export default WatchListItem;
