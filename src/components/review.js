import React from "react";
import {  Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import ReactStars from "react-rating-stars-component";


const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
        <Typography variant="h5">{review.title}</Typography>
        <ReactStars
              value={review.Rating}
              count={10}
              size={48}
              isHalf={true}
              activeColor="#ffd700"
              edit={false}
            />
        <Typography variant="h5">{review.Rating}/10</Typography>

        </CardContent>
      </Card>
    </div>
  );
};
export default Review;
