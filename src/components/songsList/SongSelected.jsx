import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from 'react-router-dom';
import { songSelectedTypography } from '../../utils/typographySelection';
import { useRandomSongs } from '../../hooks/useRandomSongs';
import { SongSelectedExtraInfo } from './elements/SongSelectedExtraInfo';
import { VideoVersionButton } from '../randoms/videoElements/VideoVersionButton';
import { SongSelectedVideoPlayer } from './elements/SongSelectedVideoPlayer';

let theme = songSelectedTypography();

theme = responsiveFontSizes(theme);

export const SongSelected = () => {
  const {
    state: { artist, title, extraInfo },
  } = useLocation();

  const onSelectedVideo = (video) => setSelectedVideo(video);

  const {
    videos,
    selectedVideo,
    setSelectedVideo,
    videoType,
    setVideoType,
    showVideoHandler,
  } = useRandomSongs();

  const videoSrc = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
    : null;

  useEffect(() => {
    showVideoHandler(artist, title);
  }, []);

  useEffect(() => {
    showVideoHandler(artist, title);
  }, [videoType]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='xl' className='animate__animated animate__fadeIn'>
          <Grid paddingTop={5}>
            <Box width='100%'>
              <Typography
                component='div'
                variant='h3'
                textAlign='center'
                className='gr_add_song_title'
              >
                Song Selected
              </Typography>
            </Box>

            <Container maxWidth='xl' sx={{ paddingTop: 2 }}>
              <Box width='100%' paddingY={2}>
                <Divider
                  className='gr_song_selected_divider'
                  style={{
                    marginBottom: '1rem',
                    borderColor: 'var(--bgAddSongBtn)',
                  }}
                />
                <Typography
                  variant='h5'
                  component='div'
                  textAlign='center'
                  className='gr_welcome_title'
                >
                  <strong>Song: </strong>
                  {title} <br />
                  <strong>Artist/Band: </strong> {artist}
                </Typography>
                <Divider
                  className='gr_divider_title'
                  style={{
                    marginTop: '1rem',
                    borderColor: 'var(--bgAddSongBtn)',
                  }}
                />
              </Box>
            </Container>
          </Grid>

          {/* Content */}

          <Grid
            paddingTop={2}
            display='flex'
            justifyContent='space-evenly'
            sx={{
              flexDirection: {
                xs: 'column-reverse',
                md: 'row',
              },
            }}
          >
            {/* Artist Info */}

            {extraInfo && <SongSelectedExtraInfo extraInfo={extraInfo} />}

            {/* Video Player */}
            <Grid width='100%'>
              <Box width='100%'>
                <Container maxWidth='md'>
                  {/* Video Version Options */}
                  <Box width='100%'>
                    <Typography
                      component='div'
                      variant='h4'
                      textAlign='center'
                      className='gr_add_song_title'
                    >
                      <strong>Select the vesion you want:</strong>
                    </Typography>

                    <Grid display='flex' gap={2} marginY={2}>
                      <VideoVersionButton
                        btnTitle={'Original'}
                        typeVideo={'original'}
                        setVideoType={setVideoType}
                      />
                      <VideoVersionButton
                        btnTitle={'Backing Track'}
                        typeVideo={'backing'}
                        setVideoType={setVideoType}
                      />
                      <VideoVersionButton
                        btnTitle={'Live'}
                        typeVideo={'live'}
                        setVideoType={setVideoType}
                      />
                    </Grid>
                  </Box>

                  {/* Video Player */}
                  <SongSelectedVideoPlayer
                    onSelectedVideo={onSelectedVideo}
                    videos={videos}
                    videoSrc={videoSrc}
                  />
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
