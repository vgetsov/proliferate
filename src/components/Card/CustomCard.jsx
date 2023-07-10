import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import { onDelete } from '../../common/utils'
import { DELETE, EDHREC_BTN_TEXT, EDIT, PRICE_TEXT } from '../../common/constants'

import './CustomCard.scss'
import { useConfirm } from 'material-ui-confirm'
import { useState } from 'react'

export const CustomCard = ({ id, name, image, cardType, effect, power, toughness, edhrec_link, price, fetchCards }) => {
  const [isLoading, setIsLoading] = useState()
  const confirm = useConfirm()

  const onDeleteButtonClick = () => {
    confirm({ title: `Delete ${name}`, description: 'Are you sure you want to delete this card?' })
      .then(async () => {
        setIsLoading(true)

        await onDelete({ id, onSuccessCallback: fetchCards })

        setIsLoading(false)
      })
      .catch(() => {})
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={name} image={image} />
      <CardContent className="card-content-wrapper">
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardType}
        </Typography>
        <Typography className="card-effect-field" variant="body2" color="text.secondary">
          {effect}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {PRICE_TEXT}
          {price}
        </Typography>
        {cardType.includes('Creature') ? (
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
            {power}/{toughness}
          </Typography>
        ) : (
          ''
        )}
      </CardContent>
      <CardActions className="edhrec-action-btn-wrapper">
        <Button component="a" href={edhrec_link} target="_blank" variant="outlined" size="small" color="secondary">
          {EDHREC_BTN_TEXT}
        </Button>
      </CardActions>
      <CardActions className="card-action-btns-wrapper">
        <Button variant="outlined" size="small">
          {EDIT}
        </Button>
        <Button variant="outlined" disabled={isLoading} onClick={onDeleteButtonClick} size="small" color="error">
          {isLoading ? 'Deleting...' : DELETE}
        </Button>
      </CardActions>
    </Card>
  )
}

CustomCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  effect: PropTypes.string.isRequired,
  power: PropTypes.string,
  toughness: PropTypes.string,
  edhrec_link: PropTypes.string.isRequired,
  price: PropTypes.string,
  fetchCards: PropTypes.func.isRequired,
}
