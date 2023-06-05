import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export const AddForm = ({
  id,
  title,
  artist,
  extraInfo,
  beat_per_minute,
  beats_per_measure,
  handleChange,
  addEditSongHandler,
}) => {
  return (
    <>
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
    </>
  );
};
