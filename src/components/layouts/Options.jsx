import React, { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import {
  Box,
  createTheme,
  CssBaseline,
  Hidden,
  IconButton,
  ThemeProvider,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTheme,
  selectThemes,
  theCurrentTheme,
} from '../../features/theme/themeSlice';

let theme = createTheme({
  typography: {
    caption: {
      // fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontFamily: ['Outfit', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 600,
    },
  },
});

export const Options = () => {
  const themes = useSelector(selectThemes);
  const currentTheme = useSelector(theCurrentTheme);
  const dispatch = useDispatch();

  const setTheme = () => {
    if (currentTheme === 'blueWhite' || currentTheme === 'redDark') {
      document.body.classList.add('gr_bg_gradient');

      // if (currentTheme === 'blueWhite') {
      //   window.CSS.registerProperty({
      //     name: '--bgClear',
      //     syntax: '<color>',
      //     inherits: true,
      //     initialValue: '#11384A'
      //   });
      //   window.CSS.registerProperty({
      //     name: '--bgDark',
      //     syntax: '<color>',
      //     inherits: true,
      //     initialValue: '#0D191C'
      //   });
      // }

      const theme = themes[currentTheme];

      Object.keys(theme).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = theme[key];

        document.body.style.setProperty(cssKey, cssValue);
      });
    } else {
      document.body.classList.remove('gr_bg_gradient');
      const theme = themes[currentTheme];

      Object.keys(theme).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = theme[key];

        document.body.style.setProperty(cssKey, cssValue);
      });
    }

    const theme = themes[currentTheme];

    Object.keys(theme).forEach((key) => {
      const cssKey = `--${key}`;
      const cssValue = theme[key];

      document.body.style.setProperty(cssKey, cssValue);
    });
  };

  const changeThemeHandler = () => {
    dispatch(changeTheme(currentTheme));
  };

  useEffect(() => {
    setTheme();
  }, []);

  useEffect(() => {
    setTheme();
  }, [currentTheme]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Hidden lgDown>
          <div className='gr_options_container'>
            <Box>
              <Tooltip
                title={
                  <Typography variant='caption'>Visit my Website</Typography>
                }
                placement='left'
                TransitionComponent={Zoom}
                arrow
              >
                <IconButton
                  onClick={() =>
                    window.open('https://alonsogchparra.web.app/', '_blank')
                  }
                >
                  <InfoIcon fontSize='large' className='gr_option' />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip
                title={
                  <>
                    <div style={{ display: 'flex' }}>
                      <Typography variant='caption' marginRight={1}>
                        Next Theme is{' '}
                      </Typography>
                      <span className='box-one'></span>
                      <span className='box-two'></span>
                    </div>
                  </>
                }
                // title='Next Theme is'
                placement='left'
                TransitionComponent={Zoom}
                arrow
              >
                <IconButton onClick={changeThemeHandler}>
                  <FormatPaintIcon fontSize='large' className='gr_option' />
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        </Hidden>
      </ThemeProvider>
    </>
  );
};
