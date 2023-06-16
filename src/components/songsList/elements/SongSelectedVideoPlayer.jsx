import React from 'react';
import { Box, Card, CardActionArea, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const SongSelectedVideoPlayer = ({
  videoSrc,
  onSelectedVideo,
  videos,
}) => {
  return (
    <>
      <div className='video-container'>
        <iframe
          src={videoSrc}
          title='Video Player'
          height='250'
          width='100%'
          allowFullScreen
        />
      </div>
      <Box width='100%' paddingTop={2}>
        <Grid
          className='video_choices'
          display='flex'
          gap={2}
          sx={{
            paddingBottom: {
              xs: 5,
              md: 0,
            },
          }}
        >
          {videos.map((video) => (
            <Box width='100%' marginX='auto' gap={2}>
              <CardActionArea
                className='gr_option_container'
                onClick={() => onSelectedVideo(video)}
              >
                <Card>
                  <CardMedia
                    sx={{ height: 60 }}
                    image={video.snippet.thumbnails.medium.url}
                  />
                </Card>
              </CardActionArea>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};
