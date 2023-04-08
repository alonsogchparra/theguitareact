import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Link } from 'react-router-dom';
import { selectUser } from '../../features/auth/userSlice';
import { useFetchSongsQuery } from '../../features/songs/songsApi';

let theme = createTheme({
  typography: {
    h3: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 600,
      fontSize: '2.7rem',
    },
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    body1: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
      fontSize: '.8rem',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 300,
      md: 600,
      bg: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
theme = responsiveFontSizes(theme);

export const Dashboard = () => {
  const currentTheme = useSelector(theCurrentTheme);
  const user = useSelector(selectUser);
  const { data: songs, isLoading, isError, error } = useFetchSongsQuery();
  const [copySongs, setCopySongs] = useState([]);

  const { displayName } = user;

  useEffect(() => {
    if (songs) {
      setCopySongs(songs.filter((song) => song.uid === user.uid));
    }
  }, [songs]);

  // console.log('COPYSONGS - Dashboard', copySongs);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='xl' className='animate__animated animate__fadeIn'>
          <Grid container display='flex' justifyContent='center' paddingTop={2}>
            <Grid display='flex' flexDirection='column' justifyContent='center'>
              <Box textAlign='center'>
                <Icon
                  width='120px'
                  fill={
                    currentTheme === 'blackYellow'
                      ? '#FEEA36'
                      : currentTheme === 'yellowBlack'
                      ? '#1D1D1D'
                      : currentTheme === 'blueWhite'
                      ? '#61DAFB'
                      : currentTheme === 'whiteBlue'
                      ? '#10374A'
                      : currentTheme === 'redDark'
                      ? '#FF3434'
                      : currentTheme === 'red'
                      ? '#4F0303'
                      : ''
                  }
                />
              </Box>

              <Box paddingTop={2}>
                <Grid container display='flex' justifyContent='center'>
                  <Box width='100%'>
                    <Typography
                      variant='h4'
                      component='div'
                      textAlign='center'
                      className='gr_welcome_title'
                    >
                      Welcome {displayName}!
                    </Typography>
                  </Box>

                  <Box marginTop={3} marginBottom={3}>
                    {isLoading ? (
                      <Typography
                        variant='h4'
                        component='div'
                        textAlign='center'
                        className='gr_you_added animate__animated animate__fadeIn animate__fast animate__infinite'
                        sx={{
                          padding: {
                            xs: '0.8rem 1rem',
                            md: '0.8rem 2rem',
                            lg: '0.8rem 5rem',
                          },
                        }}
                      >
                        Checking...
                      </Typography>
                    ) : (
                      <Typography
                        variant='h4'
                        component='div'
                        textAlign='center'
                        className='gr_you_added'
                        sx={{
                          padding: {
                            xs: '0.8rem 1rem',
                            md: '0.8rem 2rem',
                            lg: '0.8rem 5rem',
                          },
                        }}
                      >
                        You have added {copySongs.length}{' '}
                        {copySongs.length > 1 ? 'songs' : 'song'}
                      </Typography>
                    )}
                  </Box>

                  <Box width='100%'>
                    <Typography
                      variant='h3'
                      component='div'
                      textAlign='center'
                      className='gr_welcome_title'
                    >
                      What you wanna do?
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Box width='100%'>
              <Grid container spacing={6} paddingTop={5}>
                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  justifyContent='center'
                  alignItems='center'
                  className='gr_option_container'
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    to='/random-songs-with-bpm'
                  >
                    <Box className='gr_box_options'>
                      <Grid
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <PlayCircleFilledWhiteIcon
                          style={{
                            width: '5rem',
                            height: '5rem',
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice'
                        />
                        <Typography
                          variant='body1'
                          component='div'
                          className='gr_text_choice'
                        >
                          Play random songs with BPM (All)
                        </Typography>
                      </Grid>
                    </Box>
                  </Link>
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  justifyContent='center'
                  alignItems='center'
                  className='gr_option_container'
                >
                  <Link style={{ textDecoration: 'none' }} to='/random-videos'>
                    <Box className='gr_box_options'>
                      <Grid
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <PlayCircleOutlineIcon
                          style={{
                            width: '5rem',
                            height: '5rem',
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice'
                        />
                        <Typography
                          variant='body1'
                          component='div'
                          className='gr_text_choice'
                        >
                          Play random videos (All)
                        </Typography>
                      </Grid>
                    </Box>
                  </Link>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  justifyContent='center'
                  alignItems='center'
                  className='gr_option_container'
                >
                  <Link style={{ textDecoration: 'none' }} to='/add-song'>
                    <Box className='gr_box_options'>
                      <Grid
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <AddCircleIcon
                          style={{
                            width: '5rem',
                            height: '5rem',
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice'
                        />
                        <Typography
                          variant='body1'
                          component='div'
                          className='gr_text_choice'
                        >
                          Add songs to your list
                        </Typography>
                      </Grid>
                    </Box>
                  </Link>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={3}
                  justifyContent='center'
                  alignItems='center'
                  className='gr_option_container'
                >
                  <Link style={{ textDecoration: 'none' }} to='/custom-lists'>
                    <Box className='gr_box_options'>
                      <Grid
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <PlaylistAddIcon
                          style={{
                            width: '5rem',
                            height: '5rem',
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice'
                        />
                        <Typography
                          variant='body1'
                          component='div'
                          className='gr_text_choice'
                        >
                          Create a custom list
                        </Typography>
                      </Grid>
                    </Box>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
