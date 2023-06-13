import React from 'react';
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SongListTextField = ({ filteredSongsHandler }) => {
  return (
    <Container component='form' maxWidth='md'>
      <div>
        <TextField
          className='gr_email_input'
          id='song-artist-title'
          label='Find your song or artist'
          variant='standard'
          fullWidth
          margin='normal'
          autoComplete='off'
          onChange={(e) => filteredSongsHandler(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton>
                  <SearchIcon className='gr_icon_textfield' />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Container>
  );
};
