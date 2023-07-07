import { Box } from '@mui/material'
import { CustomCard } from './CustomCard'
import { useEffect, useState } from 'react'

export const CardsList = () => {
  const [cards, setCards] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/cards`)
      const data = await response.json()
      setCards(data)
      setIsLoading(false)
    }

    fetchCards()
  }, [])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      {isLoading
        ? 'Loading...'
        : cards === undefined
        ? 'Cards not fetched yet'
        : cards.map(({ id, name, image_uris, type_line, oracle_text, power, toughness, related_uris, prices }) => (
            <CustomCard
              key={id}
              name={name}
              image={image_uris.border_crop}
              cardType={type_line}
              effect={oracle_text}
              power={power}
              toughness={toughness}
              edhrec_link={related_uris.edhrec}
              price={prices.eur}
            />
          ))}
    </Box>
  )
}
