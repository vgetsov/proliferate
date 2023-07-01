import {
  AppBar,
  Box,
  Toolbar,
  //   IconButton,
  Typography,
  //   Menu,
  Container,
  //   Avatar,
  Button,
  //   Tooltip,
  //   MenuItem,
  //   Link,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { LOGO_URL, LOG_IN, LOG_OUT, MY_CARDS, MY_PROFILE, SIGN_UP } from '../../common/constants'

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
            <Typography component="ul" className="list" sx={{ my: 2, color: 'white', display: 'block', padding: 0 }}>
              <Button component={NavLink} to="/" className="nav-link" sx={{ color: 'inherit', textDecoration: 'none' }}>
                <img className="logo" src={LOGO_URL} alt="Proliferate logo" />
              </Button>
              <Button
                component={NavLink}
                to="/profile"
                className="nav-link"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {MY_PROFILE}
              </Button>
              <Button
                component={NavLink}
                to="/your-cards" // to be refactored with profile/id/your-cards
                className="nav-link"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {MY_CARDS}
              </Button>
              <Button
                component={NavLink}
                to="/log-in"
                className="nav-link"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {LOG_IN}
              </Button>
              <Button
                component={NavLink}
                to="/sign-up"
                className="nav-link"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {SIGN_UP}
              </Button>
              <Button
                component={NavLink}
                // onClick={Logout} // to be implemented with Auth0
                className="nav-link"
                to="/log-out"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                {LOG_OUT}
              </Button>
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
