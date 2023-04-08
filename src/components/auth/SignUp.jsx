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
import {
  createUserWithEmailAndPassword,
  auth,
  updateProfile,
} from '../../firebase';
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

export const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showHidePwd, setShowHidePwd] = useState(false);
  const [showHideConPwd, setShowHideConPwd] = useState(false);

  const currentTheme = useSelector(theCurrentTheme);

  const dispatch = useDispatch();

  const handlerShowHidePwdHandler = () => {
    setShowHidePwd(!showHidePwd);
  };

  const handlerShowHideConPwd = () => {
    setShowHideConPwd(!showHideConPwd);
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: fullname,
        })
          .then(
            ({
              userAuth: {
                user: { email, uid },
              },
            }) => {
              dispatch(
                login({
                  email,
                  uid,
                  displayName: fullname,
                })
              );
            }
          )
          .catch((err) => console.log('user not updated', err));
      })
      .catch((err) => console.log('ERROR CREATING USER', err));
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
              Sign Up
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
                    ? '#DCDCDC'
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
                  label='Full name'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  type='text'
                  className='gr_email_input'
                  onChange={(e) => setFullname(e.target.value)}
                  inputProps={{
                    autoComplete: 'off',
                  }}
                />
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
                  onChange={(e) => setPassword(e.target.value)}
                  type={!showHidePwd ? 'password' : 'text'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
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
                <TextField
                  id='confirm_password_input'
                  label='Confirm password'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  className='gr_password_input'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={!showHideConPwd ? 'password' : 'text'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={handlerShowHideConPwd}>
                          {showHideConPwd ? (
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
                style={{ marginTop: '30px' }}
                className='gr_add_button'
                onClick={(e) => signUpHandler(e)}
              >
                <Typography component='div' variant='h4'>
                  SIGN UP
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
