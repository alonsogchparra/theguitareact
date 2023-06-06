import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import {
  createUserWithEmailAndPassword,
  auth,
  updateProfile,
} from '../../firebase';
import { login } from '../../features/auth/userSlice';
import { signUpTypography } from '../../utils/typographySelection';
import { SignUpForm } from './SignUpForm';

let theme = signUpTypography();

theme = responsiveFontSizes(theme);

export const SignUp = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUpWrong, setIsSignUpWrong] = useState(false);

  const [showHidePwd, setShowHidePwd] = useState(false);
  const [showHideConPwd, setShowHideConPwd] = useState(false);

  const currentTheme = useSelector(theCurrentTheme);

  const dispatch = useDispatch();

  const handlerShowHidePwd = () => {
    setShowHidePwd(!showHidePwd);
  };

  const handlerShowHideConPwd = () => {
    setShowHideConPwd(!showHideConPwd);
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsSignUpWrong(true);
    } else {
      setIsSignUpWrong(false);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
          updateProfile(userAuth.user, {
            displayName: fullname,
          })
            .then(
              ({
                userAuth: {
                  user: { email, uid, displayName },
                },
              }) => {
                dispatch(
                  login({
                    email,
                    uid,
                    displayName,
                  })
                );
              }
            )
            .catch((err) => {
              console.log('user not updated', err);
              setIsSignUpWrong(true);
            });
        })
        .catch((err) => {
          console.log('ERROR CREATING USER', err);
          setIsSignUpWrong(true);
        });
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='sm' className='animate__animated animate__fadeIn'>
          <Grid paddingTop={5}>
            <Grid display='flex' justifyContent='space-between'>
              <Typography
                component='div'
                variant='h3'
                textAlign='center'
                className='gr_add_song_title'
                display='flex'
                justifyContent='center'
                alignSelf='center'
              >
                Sign Up
              </Typography>
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
            </Grid>

            <Box
              component='form'
              onSubmit={(e) => signUpHandler(e)}
              marginTop={1}
            >
              <SignUpForm
                showHidePwd={showHidePwd}
                showHideConPwd={showHideConPwd}
                setIsSignUpWrong={setIsSignUpWrong}
                setFullname={setFullname}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handlerShowHideConPwd={handlerShowHideConPwd}
                handlerShowHidePwd={handlerShowHidePwd}
              />

              {isSignUpWrong && (
                <Box paddingTop={7}>
                  <Typography
                    variant='body1'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                  >
                    Something is wrong. Check if you added a correct email
                    format, also check if the password and confirm password are
                    both equal.
                  </Typography>
                </Box>
              )}

              <Button
                fullWidth
                variant='contained'
                style={{ marginTop: '30px' }}
                className='gr_add_button'
                type='submit'
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
