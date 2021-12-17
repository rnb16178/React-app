import React, { useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Review from "./review";

export default function UserReviews() {
  const [reviews, setReviews] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    Axios.post("https://rmcmillan.co.uk/api/getReviews", {
      userID: localStorage.userID,
    }).then((response) => {
      setReviews(response.data.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  if (loading) {
    return "loading...";
  } else {
    return (
      <div style={{overflow: "hidden"}}>
        <h1>{reviews && reviews.data}</h1>
        <p>{reviews && reviews.data}</p>
        <Grid overflow="hidden" container justifyContent="center" spacing={4}>
          {reviews &&
            reviews.map((review) => (
              <Grid key={review.id} item xs={12} sm={6} md={4} lg={3}>
                <Review review={review} />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
