import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Container, Typography, Autocomplete, TextField, Stack, IconButton, Tooltip } from '@mui/material'
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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export const CardsList = () => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [cardTypes, setCardTypes] = useState([])
  const [selectedCardTypes, setSelectedCardTypes] = useState([])
  const [selectedSortAttribute, setSelectedSortAttribute] = useState('')
  const [isSortedAscending, setIsSortedAscending] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCards = useCallback(async () => {
    setIsLoading(true)

    try {
      const filterQueryParams = selectedCardTypes.map((type) => `type_line=${encodeURIComponent(type)}`).join('&')
      const sortQueryParams = `_sort=${encodeURIComponent(
        selectedSortAttribute.toLowerCase().replace('price', 'prices.eur')
      )}`
      const orderQueryParams = `_order=${encodeURIComponent(isSortedAscending ? 'asc' : 'desc')}`
      const searchQueryParams = `q=${encodeURIComponent(searchTerm)}`

      const response = await fetch(
        `${ALL_CARDS_URL}?${filterQueryParams}&${sortQueryParams}&${orderQueryParams}&${searchQueryParams}`
      )

      const data = await response.json()

      setCards(data)

      if (cardTypes.length === 0) {
        setCardTypes(Array.from(new Set(data?.map((card) => card.type_line))))
      }

      setIsError(false)
    } catch (error) {
      setIsError(true)

      toast.error(FAILED_TO_LOAD)
    } finally {
      setIsLoading(false)
    }
  }, [selectedCardTypes, selectedSortAttribute, isSortedAscending, searchTerm])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  const handleTypeChange = (_, types) => {
    setSelectedCardTypes(types)
  }

  const handleSortAttributeChange = (_, sortAttribute) => {
    setSelectedSortAttribute(sortAttribute ?? '')
  }

  const handleSortingOrder = () => {
    setIsSortedAscending(!isSortedAscending)
    // fetchCards()
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
    // fetchCards()
  }

  return (
    <>
      <WelcomingMessage fetchCards={fetchCards} />
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Stack spacing={3} marginBottom={3} sx={{ width: 500 }}>
          <Autocomplete
            multiple
            options={cardTypes}
            getOptionLabel={(option) => option}
            value={selectedCardTypes}
            onChange={handleTypeChange}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Filter by card type" placeholder="Types" />
            )}
          />
        </Stack>
        <Stack spacing={3} marginBottom={3} sx={{ width: 500 }}>
          <TextField
            value={searchTerm}
            onChange={handleSearchInput}
            variant="filled"
            label="Search"
            placeholder="Search for a card..."
          />
        </Stack>
        <Stack spacing={3} marginBottom={3} sx={{ width: 500 }}>
          <Autocomplete
            options={['Name', 'Price']}
            value={selectedSortAttribute}
            onChange={handleSortAttributeChange}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Sort by" placeholder="Sorting options" />
            )}
          />
        </Stack>
        <Stack spacing={3} marginBottom={3}>
          <IconButton color="primary" onClick={handleSortingOrder}>
            {isSortedAscending ? (
              <Tooltip title="Ascending">
                <ArrowUpwardIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Descending">
                <ArrowDownwardIcon />
              </Tooltip>
            )}
          </IconButton>
        </Stack>
      </Container>
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
          cards
            .filter((card) => card.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(({ id, name, image_uris, type_line, oracle_text, power, toughness, related_uris, prices }) => (
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
