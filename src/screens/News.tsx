import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getNews } from '../redux/actions';

export interface CurrNewsStruct {
  title: string,
  text: string,
}
export interface NewsProps {
  news: Array<CurrNewsStruct>,
  getNews: Function,
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 1000,
    marginBottom: '10px'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 12,
  },
});

export default connect(
  (state) => (state),
  dispatch => ({
    getNews: () => dispatch(getNews()),
  }),
)((props: NewsProps) => {
  const classes = useStyles();
  const { news, getNews } = props;
  useEffect(() => {
    getNews();
  });

  return (
    <div>
      {news.map(curr => (
        <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
           {curr.title}
          </Typography>
          <Typography className={classes.text} color="textSecondary">
            {curr.text}
          </Typography>
        </CardContent>
      </Card>
      ))}
    </div>
  );
});