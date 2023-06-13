import React from 'react';
import { Box, Card, CardActionArea, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const VideoPlayer = ({ videos, videoSrc }) => {
  return (
    <Box width='100%' sx={{ paddingY: { xs: 3, lg: 0 } }}>
      <div className='gr_video_random_container'>
        <iframe
          src={videoSrc}
          title='Video Player'
          height='350'
          width='100%'
          allowFullScreen
        />
      </div>
      <Box width='100%' paddingTop={2}>
        <Grid display='flex' gap={2}>
          {videos.map((video) => (
            <CardActionArea
              onClick={() => onSelectedVideo(video)}
              className='gr_option_container'
            >
              <Card>
                <CardMedia
                  sx={{ height: 80 }}
                  image={video.snippet.thumbnails.medium.url}
                />
              </Card>
            </CardActionArea>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
