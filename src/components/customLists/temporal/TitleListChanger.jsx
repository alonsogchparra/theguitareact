import React from 'react';
import { Box, IconButton, ListItem, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export const TitleListChanger = ({
  temporalTitle,
  isTitleChanged,
  keepTitleHandler,
  setIsTitleChanged,
  changeTitleHandler,
}) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={keepTitleHandler}>
            <ClearIcon className='gr_edit_btn' />
          </IconButton>
          <IconButton>
            <CheckIcon
              className='gr_edit_btn'
              onClick={() => setIsTitleChanged(!isTitleChanged)}
            />
          </IconButton>
        </>
      }
      sx={{ paddingBottom: 2 }}
    >
      <Box component='span' width='100%' className='gr_change_title'>
        <TextField
          id='title-custom'
          variant='standard'
          autoComplete='off'
          value={temporalTitle}
          name='Custom Title'
          onChange={changeTitleHandler}
          sx={{ width: 270 }}
          className='gr_temporal_title'
        />
      </Box>
    </ListItem>
  );
};
