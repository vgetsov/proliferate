import { Helmet } from 'react-helmet-async'
import { Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ChatBubble } from '@mui/icons-material'
import {
  ALL_CARDS_URL,
  CARDNAME_MAX_LENGTH,
  CARDNAME_MAX_LENGTH_MESSAGE,
  CARDNAME_MIN_LENGTH,
  CARDNAME_MIN_LENGTH_MESSAGE,
  CARDNAME_REQUIRED,
  CARD_TYPE_MAX_LENGTH,
  CARD_TYPE_MAX_LENGTH_MESSAGE,
  CARD_TYPE_MIN_LENGTH,
  CARD_TYPE_MIN_LENGTH_MESSAGE,
  CARD_TYPE_REQUIRED,
  EDHREC_LINK_PATTERN_MESSAGE,
  EDHREC_LINK_REQUIRED,
  EFFECT_MAX_LENGTH,
  EFFECT_MAX_LENGTH_MESSAGE,
  EFFECT_MIN_LENGTH,
  EFFECT_MIN_LENGTH_MESSAGE,
  EFFECT_REQUIRED,
  POWER_REQUIRED,
  TOUGHNESS_REQUIRED,
  URL_PATTERN,
  URL_PATTERN_MESSAGE,
  URL_PATTERN_REQUIRED,
} from '../../common/constants'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateCard = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ name, imageURL, cardType, effect, power, toughness, edhrec_link, price }) => {
    try {
      setIsLoading(true)

      const createNewCardData = await fetch(ALL_CARDS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          image_uris: {
            border_crop: imageURL,
          },
          type_line: cardType,
          oracle_text: effect,
          power,
          toughness,
          related_uris: {
            edhrec: edhrec_link,
          },
          prices: {
            eur: price,
          },
        }),
      })

      console.log(createNewCardData) // TODO

      toast.success('Card created successfully')

      setIsLoading(false)

      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Helmet>
        <title>Proliferate - Create a card</title>
      </Helmet>
      <Container component="main" maxWidth="xs">
        <>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'white' }}>
              <ChatBubble />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create a MTG card
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('imageURL', {
                      required: URL_PATTERN_REQUIRED,
                      pattern: {
                        value: URL_PATTERN,
                        message: URL_PATTERN_MESSAGE,
                      },
                    })}
                    required
                    fullWidth
                    name="imageURL"
                    label="Image URL"
                    id="imageURL"
                    error={Boolean(errors.imageURL)}
                    helperText={errors.imageURL?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('cardType', {
                      required: CARD_TYPE_REQUIRED,
                      minLength: {
                        value: CARD_TYPE_MIN_LENGTH,
                        message: CARD_TYPE_MIN_LENGTH_MESSAGE,
                      },
                      maxLength: {
                        value: CARD_TYPE_MAX_LENGTH,
                        message: CARD_TYPE_MAX_LENGTH_MESSAGE,
                      },
                    })}
                    name="cardType"
                    required
                    fullWidth
                    id="cardType"
                    label="Card type"
                    error={Boolean(errors.cardType)}
                    helperText={errors.cardType?.message}
                  />
                </Grid>
                <Grid item xs={12}>
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
                    required
                    fullWidth
                    id="effect"
                    label="Effect"
                    name="effect"
                    error={Boolean(errors.effect)}
                    helperText={errors.effect?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('power', {
                      required: POWER_REQUIRED,
                    })}
                    fullWidth
                    id="power"
                    label="Power"
                    name="power"
                    type="number"
                    error={Boolean(errors.power)}
                    helperText={errors.power?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('toughness', {
                      required: TOUGHNESS_REQUIRED,
                    })}
                    fullWidth
                    name="toughness"
                    id="toughness"
                    label="Toughness"
                    type="number"
                    error={Boolean(errors.toughness)}
                    helperText={errors.toughness?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('edhrec_link', {
                      required: EDHREC_LINK_REQUIRED,
                      pattern: {
                        value: URL_PATTERN,
                        message: EDHREC_LINK_PATTERN_MESSAGE,
                      },
                    })}
                    required
                    fullWidth
                    name="edhrec_link"
                    id="edhrec_link"
                    label="EDHREC link"
                    error={Boolean(errors.edhrec_link)}
                    helperText={errors.edhrec_link?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('price', {
                      required: 'Price is required',
                    })}
                    required
                    fullWidth
                    name="price"
                    id="price"
                    label="Price"
                    type="number"
                    error={Boolean(errors.price)}
                    helperText={errors.price?.message}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#40a798' }}>
                {isLoading ? 'Loading...' : 'Create card'}
              </Button>
            </Box>
          </Box>
        </>
      </Container>
    </>
  )
}
