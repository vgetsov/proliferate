import { Box, Button, Container, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ALL_CARDS_URL,
  CARD_NOT_FETCHED,
  CARD_NOT_FOUND,
  FAILED_TO_LOAD,
  FAILED_TO_LOAD_CARD,
  RETRY,
  RETRYING,
} from '../../common/constants'
import { toast } from 'react-toastify'
import { SingleCard } from './SingleCard'
import { CardSkeleton } from './CardSkeleton'

export const CardDetailsPage = () => {
  const { id } = useParams()

  const [card, setCard] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchSingleCard = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${ALL_CARDS_URL}/${id}`)

      const data = await response.json()

      setCard(data)

      setIsError(false)
    } catch (error) {
      setIsError(true)

      toast.error(FAILED_TO_LOAD)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSingleCard()
  }, [fetchSingleCard])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {isError ? (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <Typography color="text.primary">{FAILED_TO_LOAD_CARD}</Typography>
          <Button variant="outlined" disabled={isLoading} onClick={fetchSingleCard}>
            {isLoading ? RETRYING : RETRY}
          </Button>
        </Container>
      ) : isLoading ? (
        <>
          <CardSkeleton />
          <CardSkeleton />
        </>
      ) : card === undefined ? (
        CARD_NOT_FETCHED
      ) : Object.keys(card).length === 0 ? (
        CARD_NOT_FOUND
      ) : (
        <>
          <SingleCard card={card} fetchSingleCard={fetchSingleCard} />
        </>
      )}
    </Box>
  )
}
