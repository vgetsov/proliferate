import { Box, Container, Typography } from '@mui/material'
import { WELCOMING_MESSAGE } from '../../common/constants'

import './WelcomingMessage.scss'

export const WelcomingMessage = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Container className="welcoming-message-container">
      <Typography variant="h6" sx={{ fontFamily: 'Lato' }}>
        {WELCOMING_MESSAGE}
      </Typography>
    </Container>
  </Box>
)
