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
  CARD_EDITED,
  CARD_TYPE_REQUIRED,
  CREATE,
  CREATE_A_CARD,
  EDHREC_LINK_PATTERN_MESSAGE,
  EDHREC_LINK_REQUIRED,
  EDIT,
  EFFECT_MAX_LENGTH,
  EFFECT_MAX_LENGTH_MESSAGE,
  EFFECT_MIN_LENGTH,
  EFFECT_MIN_LENGTH_MESSAGE,
  EFFECT_REQUIRED,
  FAILED_TO_CREATE,
  FAILED_TO_EDIT,
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

import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'

export const FormCard = ({ card, formType, onSuccessCallback }) => {
  const { id, name, image_uris, type_line, oracle_text, power, toughness, loyalty, related_uris, prices } = card ?? {}

  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      edhrec_link: related_uris?.edhrec,
      price: prices?.eur,
    },
  })

  const watchCardType = watch('cardType', null)

  const onSubmit = async ({ name, imageUrl, cardType, effect, power, toughness, loyalty, edhrec_link, price }) => {
    console.log(111)

    try {
      setIsLoading(true)

      const cardDataResponse = await fetch(`${ALL_CARDS_URL}/${formType === EDIT ? id : ''}`, {
        method: formType === CREATE ? 'POST' : formType === EDIT ? 'PUT' : '',
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

      console.log(222)

      console.log(cardDataResponse) // TODO

      toast.success(formType === CREATE ? CARD_CREATED : formType === EDIT ? CARD_EDITED : '')

      setIsLoading(false)
      setIsModalOpen(false)

      onSuccessCallback() // fetchAllCards | fetchSingleCard
    } catch (error) {
      toast.error(formType === CREATE ? FAILED_TO_CREATE : formType === EDIT ? FAILED_TO_EDIT : '')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outlined"
        size="small"
        startIcon={formType === CREATE ? <AddIcon /> : formType === EDIT ? <EditIcon /> : ''}
      >
        {formType === CREATE ? CREATE : formType === EDIT ? EDIT : ''}
      </Button>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{formType === CREATE ? CREATE_A_CARD : formType === EDIT ? `${EDIT} ${name}` : ''}</DialogTitle>
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
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
          />
        </DialogContent>
        <DialogActions>
          {formType === CREATE ? (
            <LoadingButton
              type="submit"
              color="primary"
              loading={isLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit(onSubmit)}
            >
              {CREATE_A_CARD}
            </LoadingButton>
          ) : formType === EDIT ? (
            <>
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
              <Button
                startIcon={<CloseIcon />}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setIsModalOpen(false)}
                color="error"
              >
                {CANCEL}
              </Button>
            </>
          ) : (
            ''
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}

FormCard.propTypes = {
  card: PropTypes.object,
  onSuccessCallback: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
}
