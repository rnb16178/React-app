import { makeStyles } from '@material-ui/core/styles';
import Heart from 'react-animated-heart';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h1:{
    display: 'flex',
    justifyContent: 'centre'
  },
  Heart:{
    display: 'flex',
    justifyContent: 'right',

  }
}));