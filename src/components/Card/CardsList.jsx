import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import { CardSkeleton } from './CardSkeleton'
import { CustomCard } from './CustomCard'

import {
  ALL_CARDS_URL,
  CARDS_NOT_FETCHED,
  FAILED_TO_LOAD,
  FAILED_TO_LOAD_CARDS,
  NO_CARDS_YET,
  RETRY,
  RETRYING,
} from '../../common/constants'
import { WelcomingMessage } from '../Home/WelcomingMessage'

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

      toast.error(FAILED_TO_LOAD)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return (
    <>
      <WelcomingMessage fetchCards={fetchCards} />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
        {isError ? (
          <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <Typography color="text.primary">{FAILED_TO_LOAD_CARDS}</Typography>
            <Button variant="outlined" disabled={isLoading} onClick={fetchCards}>
              {isLoading ? RETRYING : RETRY}
            </Button>
          </Container>
        ) : isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : cards === undefined ? (
          CARDS_NOT_FETCHED
        ) : cards.length === 0 ? (
          NO_CARDS_YET
        ) : (
          cards.map(({ id, name, image_uris, type_line, oracle_text, power, toughness, related_uris, prices }) => (
            <CustomCard
              key={id}
              id={id}
              name={name}
              image={image_uris?.border_crop}
              cardType={type_line}
              effect={oracle_text}
              power={power}
              toughness={toughness}
              edhrec_link={related_uris?.edhrec}
              price={prices?.eur}
              fetchCards={fetchCards}
            />
          ))
        )}
      </Box>
    </>
  )
}
