import React, { useEffect, useState } from "react";
import Axios from "axios";
import WatchListItem from "./WatchListItem";
import Grid from "@material-ui/core/Grid";

export default function WatchList() {
  const [items, setItems] = useState("");
  const [loading, setLoading] = useState(true);
  const [counter, setCounter]= useState(0);

  useEffect(() => {

    getData();
  }, []);
  
  async function getData() {
    Axios.post("https://rmcmillan.co.uk/api/getWatchList", {
      userID: localStorage.userID,
    }).then((response) => {
      setItems(response.data.data);
    }).finally(()=>{
      setLoading(false);
    })
  }



  if (loading) {
    return "loading...";
  } else {
    if (items.length > 0) {
      return (
        <div style={{overflow: "hidden"}}>
          <Grid container justifyContent="center" spacing={4}>
            {items &&
              items.map((item, index) => (
                
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <WatchListItem item={item} />
                </Grid>

                

              ))}
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <h3>You currently do not have anything in your watch list</h3>
        </div>
      );
    }
  }
}
