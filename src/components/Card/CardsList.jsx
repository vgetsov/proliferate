import { Box, Button, Container, Typography } from '@mui/material'
import { CustomCard } from './CustomCard'
import { useCallback, useEffect, useState } from 'react'
import { ALL_CARDS_URL } from '../../common/constants'
import { toast } from 'react-toastify'

export const CardsList = () => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchCards = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch(ALL_CARDS_URL)

      const data = await response.json()

      setCards(data)

      setIsError(false)
    } catch (error) {
      setIsError(true)

      toast.error('Failed to load cards')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
      {isError ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <Typography color="text.primary">Failed to load cards</Typography>
          <Button variant="outlined" disabled={isLoading} onClick={fetchCards}>
            {isLoading ? 'Retrying' : 'Retry'}
          </Button>
        </Container>
      ) : isLoading ? (
        'Loading...'
      ) : cards === undefined ? (
        'Cards not fetched yet'
      ) : cards.length === 0 ? (
        'No cards added yet. You can create one using the button above.'
      ) : (
        cards.map(({ id, name, image_uris, type_line, oracle_text, power, toughness, related_uris, prices }) => (
          <CustomCard
            key={id}
            id={id}
            name={name}
            image={image_uris.border_crop}
            cardType={type_line}
            effect={oracle_text}
            power={power}
            toughness={toughness}
            edhrec_link={related_uris.edhrec}
            price={prices.eur}
            fetchCards={fetchCards}
          />
        ))
      )}
    </Box>
  )
}
