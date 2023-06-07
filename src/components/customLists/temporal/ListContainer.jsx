import React from 'react';
import { Box } from '@mui/material';
import { ListContent } from './ListContent';


export const ListContainer = ({ songsTempList, deleteTemporalSongHandler }) => {
  return (
    <Box
      style={{
        maxHeight: '300px',
        height: '100vh',
      }}
      component='div'
      className='gr_list_item_scroll_box'
      sx={{
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f100',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
    >
      {songsTempList &&
        songsTempList.map((songTemp) => (
          <ListContent
            id={songTemp.id}
            title={songTemp.title}
            deleteTemporalSongHandler={deleteTemporalSongHandler}
          />
        ))}
    </Box>
  );
};
