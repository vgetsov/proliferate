import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import { EDHREC_BTN_TEXT, EDIT, PRICE_TEXT } from '../../common/constants'

import EditIcon from '@mui/icons-material/Edit'

export const SingleCard = ({
  name,
  image,
  cardType,
  effect,
  power,
  toughness,
  loyalty,
  edhrec_link,
  price,
  //   fetchSingleCard, // TODO for editing cards functionality
}) => {
  //   const [isLoading, setIsLoading] = useState() // TODO for Editing cards functionality
  //   const confirm = useConfirm()

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent className="card-content-wrapper">
          <CardMedia component="img" alt={name} image={image} />
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345 }}>
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
          {cardType?.includes('Creature') ? (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
              {power}/{toughness}
            </Typography>
          ) : (
            ''
          )}
          {cardType === 'Planeswalker' ? (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }}>
              {loyalty}
            </Typography>
          ) : (
            ''
          )}
        </CardContent>
        <CardActions className="card-action-btns-wrapper">
          <Button variant="outlined" size="small" startIcon={<EditIcon />}>
            {EDIT}
          </Button>
        </CardActions>
        <CardActions className="edhrec-action-btn-wrapper">
          <Button component="a" href={edhrec_link} target="_blank" variant="outlined" size="small" color="secondary">
            {EDHREC_BTN_TEXT}
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

SingleCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  cardType: PropTypes.string.isRequired,
  effect: PropTypes.string.isRequired,
  power: PropTypes.string,
  toughness: PropTypes.string,
  loyalty: PropTypes.string,
  edhrec_link: PropTypes.string.isRequired,
  price: PropTypes.string,
  //   fetchSingleCard: PropTypes.func.isRequired,
}
