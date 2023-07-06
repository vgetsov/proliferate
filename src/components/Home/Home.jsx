import { Box, Container, Typography } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { WELCOMING_MESSAGE } from '../../common/constants'

import './Home.scss'
import { CustomCard } from '../CustomCard/CustomCard'

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Proliferate - Home</title>
      </Helmet>
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Container className="welcoming-message-container">
            <Typography variant="h5" sx={{ fontFamily: 'Lato' }}>
              {WELCOMING_MESSAGE}
            </Typography>
          </Container>
        </Box>
        <CustomCard />
      </>
    </>
  )
}
