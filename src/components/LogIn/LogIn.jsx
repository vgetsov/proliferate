import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material'
import { useForm } from 'react-hook-form'
// import { loginUser } from '../../services/auth.services'
// import { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { toast } from 'react-toastify'
// import { getUserData } from '../../services/users.services'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_PATTERN,
  EMAIL_REQUIRED,
  LOG_IN,
  LOG_IN_PROLIFERATE,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
} from '../../common/constants'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export const LogIn = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm()

  //   const onLogin = ({ email, password }) => {
  //     try {
  //       loginUser(email, password)
  //         .then((credential) => {
  //           setUser((prevAppState) => ({
  //             ...prevAppState,
  //             user: credential.user,
  //           }))
  //           return credential.user.uid
  //         })
  //         .then((uid) => {
  //           getUserData(uid).then((snapshot) => {
  //             const userDataSnapshot = snapshot.val()
  //             navigate('/')
  //             toast.success(`Welcome back, ${userDataSnapshot.username}!`)
  //           })
  //         })
  //         .catch((error) => {
  //           console.log(error.message)
  //           if (error.code === 'auth/user-not-found') {
  //             toast.error('Wrong email')
  //           }

  //           if (error.code === 'auth/wrong-password') {
  //             toast.error('Wrong password')
  //           }

  //           if (error.code === 'auth/too-many-requests') {
  //             toast.error('Too many failed login attempts! Try again later.')
  //           }
  //         })
  //     } catch (error) {
  //       console.error(error.message)
  //     }
  //   }

  return (
    <>
      <Helmet>
        <title>ChatMess - Log In</title>
        <body className="log-in-page" />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'white' }}>
              <AccountBoxIcon size={32} />
            </Avatar>
            <Typography component="h1" variant="h5">
              {LOG_IN_PROLIFERATE}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              {/* onSubmit missing */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register('email', {
                      required: EMAIL_REQUIRED,
                      pattern: {
                        value: EMAIL_PATTERN,
                        message: EMAIL_ERROR_MESSAGE,
                      },
                    })}
                    required
                    autoFocus
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password', {
                      required: PASSWORD_REQUIRED,
                      minLength: {
                        value: PASSWORD_MIN_LENGTH,
                        message: PASSWORD_ERROR_MESSAGE,
                      },
                    })}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#40a798' }}>
                {LOG_IN}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mb: '30px' }}>
                  <Link component={RouterLink} to="/sign-up" variant="body2">
                    Don&apos;t have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
        {/* (
          <Typography variant="subtitle1" component="div">
            <span className="already-logged-in-message">You&apos;re already logged in!</span>
          </Typography>
        ) */}
      </Container>
    </>
  )
}
