import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import { EDHREC_BTN_TEXT, EDIT, PRICE_TEXT } from '../../common/constants'

import { FormCard } from './FormCard'

export const SingleCard = ({ card, fetchSingleCard }) => {
  const { name, image_uris, type_line, oracle_text, power, toughness, loyalty, related_uris, prices } = card

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent className="card-content-wrapper">
          <CardMedia component="img" alt={name} image={image_uris?.border_crop} />
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent className="card-content-wrapper">
          <Typography gutterBottom variant="h5" component="div" className="card-name-field-text">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {type_line}
          </Typography>
          <Typography className="card-effect-field" variant="body2" color="text.secondary">
            {oracle_text}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {PRICE_TEXT}
            {prices?.eur}
          </Typography>
          {type_line?.includes('Creature') ? (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
              {power}/{toughness}
            </Typography>
          ) : (
            ''
          )}
          {type_line === 'Planeswalker' ? (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
              {loyalty}
            </Typography>
          ) : (
            ''
          )}
        </CardContent>
        <CardActions className="card-action-btns-wrapper">
          <FormCard card={card} onSuccessCallback={fetchSingleCard} formType={EDIT} />
        </CardActions>
        <CardActions className="edhrec-action-btn-wrapper">
          <Button
            component="a"
            href={related_uris?.edhrec}
            target="_blank"
            variant="outlined"
            size="small"
            color="secondary"
          >
            {EDHREC_BTN_TEXT}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

SingleCard.propTypes = {
  card: PropTypes.object.isRequired,
  fetchSingleCard: PropTypes.func.isRequired,
}
