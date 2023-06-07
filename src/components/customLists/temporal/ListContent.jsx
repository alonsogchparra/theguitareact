import React from 'react';
import { Divider, IconButton, ListItem, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export const ListContent = ({ id, title, deleteTemporalSongHandler }) => {
  return (
    <>
      <ListItem
        key={id}
        secondaryAction={
          <IconButton onClick={() => deleteTemporalSongHandler(id)}>
            <CancelIcon className='gr_cancel_btn' />
          </IconButton>
        }
      >
        <Typography
          component='div'
          variant='h6'
          className='gr_custom_item_text'
        >
          {title}
        </Typography>
      </ListItem>
      <Divider className='gr_divider' />
    </>
  );
};
