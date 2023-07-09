import { Box, Button, Container, Typography } from '@mui/material'
import { CREATE_A_CARD, WELCOMING_MESSAGE } from '../../common/constants'
import { useNavigate } from 'react-router-dom'

import './WelcomingMessage.scss'

export const WelcomingMessage = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Container
        className="welcoming-message-container"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h6" sx={{ fontFamily: 'Lato' }}>
          {WELCOMING_MESSAGE}
        </Typography>
        <Button onClick={() => navigate('/create-card')} variant="outlined" size="small" color="success">
          {CREATE_A_CARD}
        </Button>
      </Container>
    </Box>
  )
}
