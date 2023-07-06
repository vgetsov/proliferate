import { Helmet } from 'react-helmet-async'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container } from '@mui/material'
import { useForm } from 'react-hook-form'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_PATTERN,
  EMAIL_REQUIRED,
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  SIGN_UP,
  SIGN_UP_PROLIFERATE,
} from '../../common/constants'
import { toast } from 'react-toastify'

// import { createUser, getUserByEmail } from '../../services/users.services'
// import { registerUser } from '../../services/auth.services'
// import { useContext } from 'react'
// import { AuthContext } from '../../context/AuthContext'

// import { toast } from 'react-toastify'

export const SignUp = () => {
  // const { user, setUser } = useContext(AuthContext)

  // const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    toast.error('Missing implementation')
    console.log(data)
  }

  // const onSubmit = async ({ firstName, lastName, email, password }) => {
  //   getUserByEmail(email)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         throw new Error(`Email ${email} has already been taken!`)
  //       }

  //       return registerUser(email, password)
  //     })
  //     .then((credential) => {
  //       return createUser(email, credential.user.uid, firstName, lastName).then(() => {
  //         setUser((prevAppState) => ({
  //           ...prevAppState,
  //           user: credential.user, // this kind of tells React that we just logged in
  //         }))
  //       })
  //     })
  //     .then(() => {
  //       navigate('/home')
  //       toast.success(`Welcome, ${firstName}!`)
  //     })
  //     .catch((e) => {
  //       console.error(e)
  //       toast.error(e.message)
  //     })
  // }

  return (
    <>
      <Helmet>
        <title>Proliferate - Sign-up</title>
        <body className="sign-up-page" />
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
              {SIGN_UP_PROLIFERATE}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
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
                    fullWidth
                    autoFocus
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
                      minLength: { value: PASSWORD_MIN_LENGTH, message: PASSWORD_ERROR_MESSAGE },
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
                {SIGN_UP}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mb: '30px' }}>
                  <Link component={RouterLink} to="/log-in" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
        {/* ) : (
          <Typography variant="subtitle1" component="div">
            <span className="already-logged-in-message">You&apos;re already logged in!</span>
          </Typography>
        )} */}
      </Container>
    </>
  )
}
