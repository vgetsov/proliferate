import { Box } from '@mui/material'
import { CustomCard } from './CustomCard'
import { useCallback, useEffect, useState } from 'react'
import { ALL_CARDS_URL } from '../../common/constants'

export const CardsList = () => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchCards = useCallback(async () => {
    setIsLoading(true)

    const response = await fetch(ALL_CARDS_URL)

    const data = await response.json()
    setCards(data)

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
      {isLoading
        ? 'Loading...'
        : cards === undefined
        ? 'Cards not fetched yet'
        : cards.map(({ id, name, image_uris, type_line, oracle_text, power, toughness, related_uris, prices }) => (
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
          ))}
    </Box>
  )
}
