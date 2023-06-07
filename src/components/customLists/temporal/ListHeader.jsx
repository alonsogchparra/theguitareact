import React from 'react';
import { IconButton, ListItem, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ListHeader = ({
  temporalTitle,
  deleteAllSongsHandler,
  setIsTitleChanged,
  isTitleChanged,
  addCustomListHandler,
}) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton onClick={deleteAllSongsHandler}>
            <DeleteIcon className='gr_delete_btn' />
          </IconButton>
          <IconButton onClick={() => setIsTitleChanged(!isTitleChanged)}>
            <EditIcon className='gr_edit_btn' />
          </IconButton>
          <IconButton onClick={(e) => addCustomListHandler(e)}>
            <SaveIcon className='gr_save_btn' />
          </IconButton>
        </>
      }
      className='gr_list_item_title'
    >
      <Typography component='div' variant='h5' className='gr_custom_title'>
        {temporalTitle}
      </Typography>
    </ListItem>
  );
};
