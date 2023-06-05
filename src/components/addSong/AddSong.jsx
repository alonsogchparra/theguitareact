import React, { useEffect, useState } from 'react';
import {
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {
  useAddSongMutation,
  useFetchSongQuery,
  useUpdateSongMutation,
} from '../../features/songs/songsApi';
import { AddForm } from './AddForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { addSongTypography } from '../../utils/typographySelection';

let theme = addSongTypography();

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

            <AddForm
              id={id}
              title={title}
              artist={artist}
              beat_per_minute={beat_per_minute}
              beats_per_measure={beats_per_measure}
              extraInfo={extraInfo}
              handleChange={handleChange}
              addEditSongHandler={addEditSongHandler}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
