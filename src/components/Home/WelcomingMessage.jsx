import { Box, Container, Typography } from '@mui/material'
import { CREATE, WELCOMING_MESSAGE } from '../../common/constants'
import PropTypes from 'prop-types'

import { FormCard } from '../Card/FormCard'
import './WelcomingMessage.scss'

export const WelcomingMessage = ({ fetchCards }) => {
  return (
    <Box>
      <Container
        className="welcoming-message-container"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h6" sx={{ fontFamily: 'Lato' }}>
          {WELCOMING_MESSAGE}
        </Typography>
        <FormCard onSuccessCallback={fetchCards} formType={CREATE} />
      </Container>
    </Box>
  )
}

WelcomingMessage.propTypes = {
  fetchCards: PropTypes.func.isRequired,
}
