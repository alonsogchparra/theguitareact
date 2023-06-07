import React from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SignInForm = ({
  showHidePwd,
  handlerShowHidePwd,
  isSignInWrong,
  signInHandler,
  setIsSignInWrong,
  setEmail,
  setPassword,
}) => {
  return (
    <Box component='form' onSubmit={(e) => signInHandler(e)} marginTop={1}>
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
          onChange={(e) => {
            setIsSignInWrong(false);
            setEmail(e.target.value);
          }}
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
          onChange={(e) => {
            setIsSignInWrong(false);
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' className='gr_icon_text_container'>
                <IconButton onClick={handlerShowHidePwd}>
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

      {isSignInWrong && (
        <Box paddingTop={7}>
          <Typography
            variant='body1'
            component='div'
            textAlign='center'
            className='gr_welcome_title'
          >
            Something is wrong. Check if you added the email and password
            correctly. Or try later.
          </Typography>
        </Box>
      )}

      <Button
        fullWidth
        variant='contained'
        style={{ marginTop: '80px' }}
        className='gr_add_button'
        type='submit'
      >
        <Typography component='div' variant='h4'>
          SIGN IN
        </Typography>
      </Button>
    </Box>
  );
};
