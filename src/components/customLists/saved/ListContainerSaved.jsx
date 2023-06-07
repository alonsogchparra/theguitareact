import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CustomListSaved } from './CustomListSaved';

export const ListContainerSaved = ({
  customLists,
  deleteCustomListHandler,
  songListSavedOpenModalHandler,
}) => {
  return (
    <Box width='100%'>
      <Typography
        component='div'
        variant='h4'
        textAlign='left'
        className='gr_add_song_title'
      >
        Lists Saved
      </Typography>
      <Grid container spacing={6} paddingTop={5}>
        {/* Data from Firebase */}

        {customLists &&
          customLists.map((customList) => (
            <CustomListSaved
              key={customList?.id}
              customList={customList}
              deleteCustomListHandler={deleteCustomListHandler}
              songListSavedOpenModalHandler={songListSavedOpenModalHandler}
            />
          ))}
      </Grid>
    </Box>
  );
};
