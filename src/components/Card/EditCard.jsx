import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import {
  ALL_CARDS_URL,
  CANCEL,
  CARDNAME_MAX_LENGTH,
  CARDNAME_MAX_LENGTH_MESSAGE,
  CARDNAME_MIN_LENGTH,
  CARDNAME_MIN_LENGTH_MESSAGE,
  CARDNAME_REQUIRED,
  CARD_CREATED,
  CARD_TYPE_REQUIRED,
  EDHREC_LINK_PATTERN_MESSAGE,
  EDHREC_LINK_REQUIRED,
  EFFECT_MAX_LENGTH,
  EFFECT_MAX_LENGTH_MESSAGE,
  EFFECT_MIN_LENGTH,
  EFFECT_MIN_LENGTH_MESSAGE,
  EFFECT_REQUIRED,
  FAILED_TO_CREATE,
  LOYALTY_MIN_VALUE,
  LOYALTY_MIN_VALUE_MESSAGE,
  LOYALTY_REQUIRED,
  POWER_MIN_VALUE,
  POWER_MIN_VALUE_MESSAGE,
  POWER_REQUIRED,
  SUBMIT_CHANGES,
  TOUGHNESS_MIN_VALUE,
  TOUGHNESS_MIN_VALUE_MESSAGE,
  TOUGHNESS_REQUIRED,
  URL_PATTERN,
  URL_PATTERN_MESSAGE,
  URL_PATTERN_REQUIRED,
} from '../../common/constants'
import { LoadingButton } from '@mui/lab'

import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'

export const EditCard = ({ card, fetchSingleCard, isModalOpen, setIsModalOpen }) => {
  const { id, name, image_uris, type_line, oracle_text, power, toughness, loyalty, related_uris, prices } = card

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      imageUrl: image_uris?.border_crop,
      cardType: type_line,
      effect: oracle_text,
      power,
      toughness,
      loyalty,
      edhrec_link: related_uris.edhrec,
      price: prices.eur,
    },
  })

  const watchCardType = watch('cardType', null)

  const onSubmit = async ({ name, imageUrl, cardType, effect, power, toughness, loyalty, edhrec_link, price }) => {
    try {
      setIsLoading(true)

      const editCardData = await fetch(`${ALL_CARDS_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          image_uris: {
            border_crop: imageUrl,
          },
          type_line: cardType,
          oracle_text: effect,
          power,
          toughness,
          loyalty,
          related_uris: {
            edhrec: edhrec_link,
          },
          prices: {
            eur: price,
          },
        }),
      })

      console.log(editCardData) // TODO

      toast.success(CARD_CREATED)

      setIsLoading(false)
      setIsModalOpen(false)

      fetchSingleCard()

      //   navigate('/')
    } catch (error) {
      toast.error(FAILED_TO_CREATE)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Edit {name}</DialogTitle>
        <DialogContent>
          <TextField
            {...register('name', {
              required: CARDNAME_REQUIRED,
              minLength: {
                value: CARDNAME_MIN_LENGTH,
                message: CARDNAME_MIN_LENGTH_MESSAGE,
              },
              maxLength: {
                value: CARDNAME_MAX_LENGTH,
                message: CARDNAME_MAX_LENGTH_MESSAGE,
              },
            })}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            name="name"
            fullWidth
            variant="filled"
            defaultValue={name}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('imageUrl', {
              required: URL_PATTERN_REQUIRED,
              pattern: {
                value: URL_PATTERN,
                message: URL_PATTERN_MESSAGE,
              },
            })}
            margin="dense"
            id="imageUrl"
            label="Image URL"
            name="imageUrl"
            fullWidth
            variant="filled"
            defaultValue={image_uris?.border_crop}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl?.message}
          />
          <TextField
            {...register('cardType', {
              required: CARD_TYPE_REQUIRED,
            })}
            margin="dense"
            id="cardType"
            label="Card type"
            name="cardType"
            fullWidth
            variant="filled"
            error={Boolean(errors.cardType)}
            helperText={errors.cardType?.message}
          />
          <TextField
            {...register('effect', {
              required: EFFECT_REQUIRED,
              minLength: {
                value: EFFECT_MIN_LENGTH,
                message: EFFECT_MIN_LENGTH_MESSAGE,
              },
              maxLength: {
                value: EFFECT_MAX_LENGTH,
                message: EFFECT_MAX_LENGTH_MESSAGE,
              },
            })}
            margin="dense"
            id="effect"
            label="Effect"
            name="effect"
            fullWidth
            multiline
            variant="filled"
            defaultValue={oracle_text}
            error={Boolean(errors.effect)}
            helperText={errors.effect?.message}
          />
          {watchCardType?.includes('Creature') && (
            <>
              <TextField
                {...register('power', {
                  required: POWER_REQUIRED,
                  min: {
                    value: POWER_MIN_VALUE,
                    message: POWER_MIN_VALUE_MESSAGE,
                  },
                })}
                margin="dense"
                id="power"
                label="Power"
                name="power"
                type="number"
                fullWidth
                variant="filled"
                value={power}
                error={Boolean(errors.power)}
                helperText={errors.power?.message}
              />
              <TextField
                {...register('toughness', {
                  required: TOUGHNESS_REQUIRED,
                  min: {
                    value: TOUGHNESS_MIN_VALUE,
                    message: TOUGHNESS_MIN_VALUE_MESSAGE,
                  },
                })}
                margin="dense"
                id="toughness"
                label="Toughness"
                name="toughness"
                type="number"
                fullWidth
                defaultValue={toughness}
                variant="filled"
                error={Boolean(errors.toughness)}
                helperText={errors.toughness?.message}
              />
            </>
          )}
          {watchCardType === 'Planeswalker' && (
            <TextField
              {...register('loyalty', {
                required: LOYALTY_REQUIRED,
                min: {
                  value: LOYALTY_MIN_VALUE,
                  message: LOYALTY_MIN_VALUE_MESSAGE,
                },
              })}
              margin="dense"
              id="loyalty"
              label="Loyalty"
              name="loyalty"
              type="number"
              fullWidth
              variant="filled"
              defaultValue={loyalty}
              error={Boolean(errors.loyalty)}
              helperText={errors.loyalty?.message}
            />
          )}
          <TextField
            {...register('edhrec_link', {
              required: EDHREC_LINK_REQUIRED,
              pattern: {
                value: URL_PATTERN,
                message: EDHREC_LINK_PATTERN_MESSAGE,
              },
            })}
            margin="dense"
            id="edhrec_link"
            label="EDHREC link"
            name="edhrec_link"
            fullWidth
            variant="filled"
            defaultValue={related_uris.edhrec}
            error={Boolean(errors.edhrec_link)}
            helperText={errors.edhrec_link?.message}
          />
          <TextField
            {...register('price', {
              required: 'Price is required',
            })}
            margin="dense"
            id="price"
            label="Price"
            name="price"
            fullWidth
            variant="filled"
            type="number"
            defaultValue={prices.eur}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            color="primary"
            loading={isLoading}
            loadingPosition="start"
            startIcon={<EditIcon />}
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            {SUBMIT_CHANGES}
          </LoadingButton>
          <Button startIcon={<CloseIcon />} sx={{ mt: 3, mb: 2 }} onClick={() => setIsModalOpen(false)} color="error">
            {CANCEL}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

EditCard.propTypes = {
  card: PropTypes.object.isRequired,
  fetchSingleCard: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
}
