import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import WatchListItem from './WatchListItem';
import Grid from "@material-ui/core/Grid";

export default function WatchList() {
  const [items, setItems] = useState("");

    useEffect(() => {
        Axios.post("http://rmcmillan.co.uk/getWatchList", {
          userID: 1,

        }).then((response) => {
          console.log(response.data.data);
          setItems(response.data.data)
        });
      },[]);
      if( items.length>0){
    return (
      
        <div>
            <Grid container justifyContent="center" spacing={4}>
    {items &&
      items.map((item) => (
        <Grid key={item.id} item xs={12} sm={12} md={12} lg={12}>
          <WatchListItem item={item} />
        </Grid>
      ))}
      </Grid>
        </div>
    )}else{
      return(<div>
        <h3>You currently do not have anything in your watch list</h3>
      </div>);
    }
}
