import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import { selectUser } from '../../features/auth/userSlice';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { dashboardTypography } from '../../utils/typographySelection';
import { DashboardOptions } from './DashboardOptions';

let theme = dashboardTypography();

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

            <DashboardOptions />
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
