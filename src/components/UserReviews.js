import React, { useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Review from "./review";

export default function UserReviews() {
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    Axios.post("http://rmcmillan.co.uk/getReviews", {
      userID: 1,

    }).then((response) => {
      console.log(response.data.data);
      setReviews(response.data.data)
    });
  },[]);
  
  return <div>
    
    <h1>{reviews && reviews.data}</h1>
    <p>{reviews && reviews.data}</p>
    <Grid container justifyContent="center" spacing={4}>
    {reviews &&
      reviews.map((review) => (
        <Grid key={review.id} item xs={12} sm={12} md={12} lg={12}>
          <Review review={review} />
        </Grid>
      ))}
      </Grid>
 
  </div>;
}
