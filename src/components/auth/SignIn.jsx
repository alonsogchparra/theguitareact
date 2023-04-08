import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  InputAdornment,
  responsiveFontSizes,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { login } from '../../features/auth/userSlice';

let theme = createTheme({
  typography: {
    h3: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
  },
});

theme = responsiveFontSizes(theme);

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHidePwd, setShowHidePwd] = useState(false);

  const dispatch = useDispatch();

  const currentTheme = useSelector(theCurrentTheme);

  const handlerShowHidePwdHandler = () => {
    setShowHidePwd(!showHidePwd);
  };

  const signInHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((err) => console.log('SIGN IN ERROR', err));
  };
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
              Sign In
            </Typography>

            <Box textAlign='center' marginTop={5}>
              <Icon
                width='80px'
                fill={
                  currentTheme === 'blackYellow'
                    ? '#FEEA36'
                    : currentTheme === 'yellowBlack'
                    ? '#1D1D1D'
                    : currentTheme === 'blueWhite'
                    ? '#61DAFB'
                    : currentTheme === 'whiteBlue'
                    ? '#10374A'
                    : currentTheme === 'redDark'
                    ? '#FF3434'
                    : currentTheme === 'red'
                    ? '#4F0303'
                    : ''
                }
              />
            </Box>

            <Box component='form' marginTop={1}>
              <div>
                <TextField
                  id='email_input'
                  label='Email'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  type='email'
                  className='gr_email_input'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id='password_input'
                  label='Password'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  className='gr_password_input'
                  type={!showHidePwd ? 'password' : 'text'}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        className='gr_icon_text_container'
                      >
                        <IconButton onClick={handlerShowHidePwdHandler}>
                          {showHidePwd ? (
                            <VisibilityOffIcon className='gr_icon_textfield' />
                          ) : (
                            <VisibilityIcon className='gr_icon_textfield' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Button
                fullWidth
                variant='contained'
                style={{ marginTop: '80px' }}
                className='gr_add_button'
                onClick={(e) => signInHandler(e)}
              >
                <Typography component='div' variant='h4'>
                  SIGN IN
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
