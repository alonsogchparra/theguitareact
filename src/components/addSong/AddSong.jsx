import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  useAddSongMutation,
  useFetchSongQuery,
  useUpdateSongMutation,
} from '../../features/songs/songsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';

let theme = createTheme({
  typography: {
    h3: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
  },
});

theme = responsiveFontSizes(theme);

export const AddSong = () => {
  const user = useSelector(selectUser);
  const { uid, displayName } = user;

  const [data, setData] = useState({
    title: '',
    artist: '',
    extraInfo: '',
    beat_per_minute: 0,
    beats_per_measure: 4,
    uid,
    displayName: displayName,
  });

  const [addSong] = useAddSongMutation();

  const navigate = useNavigate();
  const { id } = useParams();

  const { data: song } = useFetchSongQuery(id ? id : skipToken);
  const [updateSong] = useUpdateSongMutation();

  const { title, artist, extraInfo, beat_per_minute, beats_per_measure } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const addEditSongHandler = async (e) => {
    e.preventDefault();

    if (title && artist) {
      if (!id) {
        await addSong(data);
        navigate('/dashboard');
      } else {
        await updateSong({ id, data });
        navigate('/dashboard');
      }
    }
  };

  useEffect(() => {
    if (id && song) {
      setData({ ...song });
    }
  }, [id, song]);

  // console.log('SONG INFO', song);
  // console.log('DATA INFO', data);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='sm' className='animate__animated animate__fadeIn'>
          <Grid paddingTop={5}>
            <Typography
              component='div'
              variant='h3'
              textAlign='center'
              className='gr_add_song_title'
            >
              {id ? 'Edit Song' : 'Add Song'}
            </Typography>

            <Box component='form' marginTop={5}>
              <div>
                <TextField
                  id='song-title'
                  label='Song Title'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  name='title'
                  value={title}
                  className='gr_email_input'
                  onChange={handleChange}
                />
                <TextField
                  id='artist-name'
                  label='Artist/Band’s name'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  name='artist'
                  value={artist}
                  className='gr_email_input'
                  onChange={handleChange}
                />
                <TextField
                  id='artist-name'
                  label='Beat Per Minute (Optional)'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  name='beat_per_minute'
                  value={beat_per_minute}
                  className='gr_email_input'
                  onChange={handleChange}
                  InputLabelProps={{shrink: true}}

                />
                <TextField
                  id='artist-name'
                  label='Beats per measure (Optional)'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  name='beats_per_measure'
                  value={beats_per_measure}
                  className='gr_email_input'
                  onChange={handleChange}
                  InputLabelProps={{shrink: true}}
                />
                <TextField
                  id='additional-info'
                  label='Extra Info (Optional)'
                  multiline
                  fullWidth
                  rows={4}
                  margin='normal'
                  style={{ marginTop: '20px' }}
                  autoComplete='off'
                  name='extraInfo'
                  value={extraInfo}
                  className='gr_extra_info'
                  onChange={handleChange}
                />
              </div>

              <Button
                fullWidth
                variant='contained'
                style={{ marginTop: '30px' }}
                className='gr_add_button'
                onClick={(e) => addEditSongHandler(e)}
              >
                <Typography component='div' variant='h4'>
                  {id ? 'UPDATE' : 'ADD'}
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
