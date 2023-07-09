import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import { ALL_CARDS_URL, DELETE, EDHREC_BTN_TEXT, EDIT, PRICE_TEXT } from '../../common/constants'

import './CustomCard.scss'
import { toast } from 'react-toastify'

export const CustomCard = ({ id, name, image, cardType, effect, power, toughness, edhrec_link, price }) => {
  const onDelete = async (id) => {
    try {
      const removeCardData = await fetch(`${ALL_CARDS_URL}/${id}`, {
        method: 'DELETE',
      })

      console.log(removeCardData) // TODO refetch all cards IMMEDIATELY

      toast.info('Card deleted successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" alt={name} height="480" image={image} />
      <CardContent className="card-content-wrapper">
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {effect}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {PRICE_TEXT}
          {price}
        </Typography>
        {cardType.includes('Creature') ? (
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
            <Typography>
              {power}/{toughness}
            </Typography>
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
        <Button variant="outlined" onClick={() => onDelete(id)} size="small" color="error">
          {DELETE}
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
}
