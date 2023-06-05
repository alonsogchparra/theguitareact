import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation } from 'react-router-dom';
import youtube from '../../api/youtube';
import { key } from '../../keys/youtube';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { songSelectedTypography } from '../../utils/typographySelection';

let theme = songSelectedTypography();

theme = responsiveFontSizes(theme);

export const SongSelected = () => {
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoType, setVideoType] = useState('original');

  const {
    state: { artist, title, extraInfo },
  } = useLocation();

  const onSelectedVideo = (video) => setSelectedVideo(video);

  const showVideoHandler = async (artist, title) => {
    let searchTerm;

    if (videoType === 'original') {
      searchTerm = `${title} ${artist}`;
    } else if (videoType === 'backing') {
      searchTerm = `${title} ${artist} backing track`;
    } else if (videoType === 'live') {
      searchTerm = `${title} ${artist} live`;
    }

    try {
      const response = await youtube.get('search', {
        params: {
          part: 'snippet',
          maxResult: 5,
          key,
          q: searchTerm,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.log('ERROR SEARCHING VIDEO', error);
    }
  };

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

            {extraInfo && (
              <Grid
                width='100%'
                sx={{
                  paddingBottom: {
                    xs: 5,
                    md: 0,
                  },
                }}
              >
                <Box width='100%'>
                  <Typography
                    component='div'
                    variant='h4'
                    textAlign='center'
                    className='gr_add_song_title'
                  >
                    <strong>Extra Info:</strong>
                  </Typography>

                  <Typography
                    component='div'
                    variant='h4'
                    textAlign='center'
                    className='gr_add_song_title'
                    paddingTop={3}
                    style={{
                      whiteSpace: 'pre-line',
                      verticalAlign: 'bottom',
                    }}
                  >
                    {extraInfo}
                  </Typography>
                </Box>
              </Grid>
            )}

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
                      <Button
                        variant='contained'
                        fullWidth
                        className='gr_start_btn'
                        onClick={() => setVideoType('original')}
                      >
                        <Box width='100%'>
                          <Grid container display='flex' flexDirection='row'>
                            <Grid
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flex={1}
                            >
                              <Typography
                                variant='body1'
                                component='div'
                                textAlign='center'
                                fontFamily='Outfit'
                                fontWeight='700'
                                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
                              >
                                Original
                              </Typography>
                            </Grid>
                            <Grid
                              justifyContent='flex-start'
                              alignItems='center'
                              sx={{ display: { xs: 'none', lg: 'flex' } }}
                            >
                              <OndemandVideoIcon
                                style={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Button>
                      <Button
                        variant='contained'
                        fullWidth
                        className='gr_start_btn'
                        onClick={() => setVideoType('backing')}
                      >
                        <Box width='100%'>
                          <Grid container display='flex' flexDirection='row'>
                            <Grid
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flex={1}
                            >
                              <Typography
                                variant='body1'
                                component='div'
                                textAlign='center'
                                fontFamily='Outfit'
                                fontWeight='700'
                                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
                              >
                                Backing Track
                              </Typography>
                            </Grid>
                            <Grid
                              justifyContent='flex-start'
                              alignItems='center'
                              sx={{ display: { xs: 'none', lg: 'flex' } }}
                            >
                              <OndemandVideoIcon
                                style={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Button>
                      <Button
                        variant='contained'
                        fullWidth
                        className='gr_start_btn'
                        onClick={() => setVideoType('live')}
                      >
                        <Box width='100%'>
                          <Grid container display='flex' flexDirection='row'>
                            <Grid
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flex={1}
                            >
                              <Typography
                                variant='body1'
                                component='div'
                                textAlign='center'
                                fontFamily='Outfit'
                                fontWeight='700'
                                sx={{ fontSize: { xs: '0.8rem', md: '1rem' } }}
                              >
                                Live
                              </Typography>
                            </Grid>
                            <Grid
                              justifyContent='flex-start'
                              alignItems='center'
                              sx={{ display: { xs: 'none', lg: 'flex' } }}
                            >
                              <OndemandVideoIcon
                                style={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Button>
                    </Grid>
                  </Box>

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
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
