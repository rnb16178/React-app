import React from "react";
import {  Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import ReactStars from "react-rating-stars-component";


const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <div style={{overflow: "hidden"}}>
      <Card className={classes.root}>
        <CardContent><div style={{width:'250px'}}>
        <Typography variant="h5">{review.title}</Typography>
        <img src={"https://rmcmillan.co.uk/api/images/"+review.url} width="100%"/>
        <ReactStars
              value={review.Rating/2}
              count={5}
              size={48}
              isHalf={true}
              activeColor="#ffd700"
              edit={false}
            />
</div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Review;
