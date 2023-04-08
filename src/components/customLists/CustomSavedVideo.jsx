import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { songsList, titleList } from '../../features/songs/songsSavedSlice';
import youtube from '../../api/youtube';
import { key } from '../../keys/youtube';
import Grid from '@mui/material/Unstable_Grid2';

let theme = createTheme({
  typography: {
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
    h5: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
    h6: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
  },
});

theme = responsiveFontSizes(theme);

export const CustomSavedVideo = () => {
  const listSongs = useSelector(songsList);
  const listTitle = useSelector(titleList);

  const [musicList, setMusicList] = useState([]);
  const [copyMusicList, setCopyMusicList] = useState([]);
  const [musicItem, setMusicItem] = useState('');
  const [counter, setCounter] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoType, setVideoType] = useState('original');

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

  const getRandomNumber = (min, max) => {
    let stepOne = max - min;
    let stepTwo = Math.random() * stepOne;
    let result = Math.floor(stepTwo) + min;
    return result;
  };

  const getSong = () => {
    if (musicList.length === 0) {
      setMusicItem('');
    } else {
      setIsButtonPressed(true);
      let randomIndex = getRandomNumber(0, musicList.length);
      let randomSong = musicList[randomIndex];

      setMusicList(
        musicList.filter((music) => music.title !== randomSong.title)
      );

      setMusicItem(randomSong);
      setCounter(counter + 1);

      // showVideoHandler(musicItem?.artist, musicItem?.title);
    }
  };

  const startOver = () => {
    setMusicList(copyMusicList);
    setCounter(0);
    setMusicItem('');
    setIsButtonPressed(false);
    // setSelectedVideo('');
    // setVideos([]);
  };

  const videoSrc = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
    : null;

  useEffect(() => {
    if (listSongs) {
      setMusicList(listSongs);
      setCopyMusicList(listSongs);
    }
  }, []);

  useEffect(() => {
    if (musicItem === '' || musicItem === null || musicItem === undefined) {
      return;
    } else {
      showVideoHandler(musicItem?.artist, musicItem?.title);
    }
  }, [musicItem]);

  useEffect(() => {
    showVideoHandler(musicItem?.artist, musicItem?.title);
  }, [videoType]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth='xl'
          style={{ height: '100vh' }}
          className='animate__animated animate__fadeIn'
        >
          <Grid container display='flex' justifyContent='center' paddingTop={2}>
            <Box paddingTop={2}>
              <Box width='100%'>
                <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
                  className='gr_welcome_title'
                  fontWeight='700'
                >
                  Play random Videos. ({listTitle})
                </Typography>
              </Box>
              <Box width='100%' paddingTop={2}>
                <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
                  className='gr_welcome_title'
                >
                  You have <strong>{copyMusicList.length}</strong> songs on your
                  list. Songs Played: <strong>{counter}</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Container
            sx={{
              maxWidth: { xs: 'sm', lg: !musicItem ? 'sm' : 'xl' },
              paddingTop: { xs: '0px', lg: '30px' },
            }}
          >
            <Box width='100%'>
              <Grid
                display='flex'
                justifyContent='space-around'
                gap={4}
                sx={{ flexDirection: { xs: 'column', lg: 'row-reverse' } }}
              >
                {/* Video Player */}

                {musicItem !== '' && (
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
                )}

                <Box className='gr_operator' width='100%'>
                  {musicItem && (
                    <>
                      <Box
                        width='100%'
                        paddingY={2}
                        className='gr_song_info_box'
                      >
                        <Typography
                          variant='h5'
                          component='div'
                          textAlign='center'
                          fontWeight='700'
                          className='gr_info_text'
                        >
                          Song: {musicItem?.title}
                        </Typography>
                        <Typography
                          variant='h5'
                          component='div'
                          textAlign='center'
                          fontWeight='700'
                          className='gr_info_text'
                        >
                          Artist/Band: {musicItem?.artist}
                        </Typography>
                      </Box>

                      <Typography
                        paddingTop={2}
                        variant='h5'
                        component='div'
                        textAlign='center'
                        className='gr_welcome_title'
                      >
                        Select the vesion you want:
                      </Typography>

                      <Grid display='flex' gap={2} marginY={2}>
                        <Button
                          variant='contained'
                          fullWidth
                          className='gr_start_btn'
                          onClick={() => setVideoType('original')}
                        >
                          <Typography
                            variant='body1'
                            component='div'
                            textAlign='center'
                            fontFamily='Outfit'
                            fontWeight='700'
                          >
                            Original
                          </Typography>
                        </Button>
                        <Button
                          variant='contained'
                          fullWidth
                          className='gr_start_btn'
                          onClick={() => setVideoType('backing')}
                        >
                          <Typography
                            variant='body1'
                            component='div'
                            textAlign='center'
                            fontFamily='Outfit'
                            fontWeight='700'
                          >
                            Backing Track
                          </Typography>
                        </Button>
                        <Button
                          variant='contained'
                          fullWidth
                          className='gr_start_btn'
                          onClick={() => setVideoType('live')}
                        >
                          <Typography
                            variant='body1'
                            component='div'
                            textAlign='center'
                            fontFamily='Outfit'
                            fontWeight='700'
                          >
                            Live
                          </Typography>
                        </Button>
                      </Grid>
                    </>
                  )}

                  <Box
                    width='100%'
                    marginTop={2}
                    sx={{ marginBottom: { xs: 2, lg: 0 } }}
                  >
                    {!musicItem && (
                      <Typography
                        component='div'
                        variant='h5'
                        textAlign='center'
                        className='gr_text_start_over'
                      >
                        To show a random video, press the button to start with.
                      </Typography>
                    )}

                    {counter === copyMusicList.length && (
                      <Typography
                        component='div'
                        variant='h5'
                        textAlign='center'
                        className='gr_text_start_over'
                      >
                        You played all the songs on your list. Do you want to
                        start over?
                      </Typography>
                    )}

                    <Button
                      variant='contained'
                      fullWidth
                      style={{ marginTop: '15px' }}
                      className='gr_next_btn'
                      onClick={
                        copyMusicList.length === counter ? startOver : getSong
                      }
                    >
                      <Typography
                        variant='h4'
                        component='div'
                        textAlign='center'
                        fontFamily='Outfit'
                        fontWeight='700'
                      >
                        {copyMusicList.length === counter
                          ? 'PLAY AGAIN'
                          : isButtonPressed
                          ? 'NEXT'
                          : 'PLAY'}
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Container>

          {musicItem.extraInfo && (
            <Container
              sx={{
                maxWidth: { xs: 'sm', lg: 'xl' },
              }}
            >
              <Box
                width='100%'
                paddingBottom={3}
                marginTop={4}
                className='gr_box_options'
                // sx={{ paddingTop: { xs: 0, lg: 3 } }}
              >
                <Typography
                  component='div'
                  variant='h4'
                  textAlign='center'
                  className='gr_add_song_title'
                  paddingTop={3}
                >
                  <strong>Extra Info:</strong>
                </Typography>
                <Typography
                  component='div'
                  variant='h4'
                  textAlign='center'
                  className='gr_add_song_title'
                  paddingTop={3}
                >
                  {musicItem.extraInfo}
                </Typography>
              </Box>
            </Container>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};
