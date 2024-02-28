import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';

function TouristSpotComponent(props) {
  const { post } = props;
  console.log(post)
  return  post?.spotPictureList?.[0] ? (
    <Grid item xs={12} md={6}>
      <Link  to={`/Spot/${post.spotName}`}>
      <CardActionArea component="Link">
        <Card sx={{ display: 'flex', height: 120, width: 500 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.spotName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.location?.state}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
            image={post?.spotPictureList?.[0]}
            alt={post.imageLabel}
          />
        </Card>
      </CardActionArea>
      </Link>
      
    </Grid>
  ):(
    <Grid item xs={12} md={6}>
    <CardActionArea >
      <Card sx={{ display: 'flex', height: 120, width: 500 }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            No Tourist Spots
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  </Grid>
  )
}

TouristSpotComponent.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TouristSpotComponent;