import React from 'react';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const NoCustomList = () => {
  return (
    <Container maxWidth='xl' className='animate__animated animate__fadeIn'>
      <Typography
        component='div'
        variant='h5'
        textAlign='center'
        className='gr_add_song_title'
        paddingTop={3}
        style={{ fontWeight: 300 }}
      >
        If you don't have any song added, go to{' '}
        <Link to='/add-song' className='gr_nav_tittle'>
          Add Song
        </Link>{' '}
        section.
      </Typography>
      <Typography
        component='div'
        variant='h5'
        textAlign='center'
        className='gr_add_song_title'
        paddingTop={3}
        style={{ fontWeight: 300 }}
      >
        Or If you have songs added go to{' '}
        <Link to='/songs-list' className='gr_nav_tittle'>
          Songs List
        </Link>{' '}
        and create a custom songs list to play
      </Typography>
    </Container>
  );
};
