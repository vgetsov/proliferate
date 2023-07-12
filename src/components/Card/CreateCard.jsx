import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Avatar, TextField, Grid, Box, Typography, Container, Autocomplete } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, useForm } from 'react-hook-form'
import { ChatBubble } from '@mui/icons-material'

import SaveIcon from '@mui/icons-material/Save'

import {
  ALL_CARDS_URL,
  CARDNAME_MAX_LENGTH,
  CARDNAME_MAX_LENGTH_MESSAGE,
  CARDNAME_MIN_LENGTH,
  CARDNAME_MIN_LENGTH_MESSAGE,
  CARDNAME_REQUIRED,
  CARD_CREATED,
  CARD_TYPES,
  CARD_TYPE_REQUIRED,
  CREATE_A_CARD,
  CREATE_A_MTG_CARD,
  CREATE_PAGE_TITLE,
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
  TOUGHNESS_MIN_VALUE,
  TOUGHNESS_MIN_VALUE_MESSAGE,
  TOUGHNESS_REQUIRED,
  URL_PATTERN,
  URL_PATTERN_MESSAGE,
  URL_PATTERN_REQUIRED,
} from '../../common/constants'

export const CreateCard = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardType: null,
    },
  })

  const watchCardType = watch('cardType', null)

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

      toast.success(CARD_CREATED)

      setIsLoading(false)

      navigate('/')
    } catch (error) {
      toast.error(FAILED_TO_CREATE)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{CREATE_PAGE_TITLE}</title>
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
              {CREATE_A_MTG_CARD}
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
                    fullWidth
                    name="imageURL"
                    label="Image URL"
                    id="imageURL"
                    error={Boolean(errors.imageURL)}
                    helperText={errors.imageURL?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field: { onChange, ...props } }) => (
                      <Autocomplete
                        fullWidth
                        disablePortal
                        options={CARD_TYPES}
                        onChange={(_, data) => onChange(data)}
                        {...props}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Card type"
                            error={Boolean(errors.cardType)}
                            helperText={errors.cardType?.message}
                            id="cardType"
                            name="cardType"
                          />
                        )}
                      />
                    )}
                    name="cardType"
                    control={control}
                    rules={{
                      required: CARD_TYPE_REQUIRED,
                    }}
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
                    fullWidth
                    id="effect"
                    label="Effect"
                    name="effect"
                    error={Boolean(errors.effect)}
                    helperText={errors.effect?.message}
                  />
                </Grid>
                {watchCardType?.includes('Creature') && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        {...register('power', {
                          required: POWER_REQUIRED,
                          min: {
                            value: POWER_MIN_VALUE,
                            message: POWER_MIN_VALUE_MESSAGE,
                          },
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
                          min: {
                            value: TOUGHNESS_MIN_VALUE,
                            message: TOUGHNESS_MIN_VALUE_MESSAGE,
                          },
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
                  </>
                )}
                {watchCardType === 'Planeswalker' && (
                  <Grid item xs={12}>
                    <TextField
                      {...register('loyalty', {
                        required: LOYALTY_REQUIRED,
                        min: {
                          value: LOYALTY_MIN_VALUE,
                          message: LOYALTY_MIN_VALUE_MESSAGE,
                        },
                      })}
                      fullWidth
                      name="loyalty"
                      id="loyalty"
                      label="Loyalty"
                      type="number"
                      error={Boolean(errors.loyalty)}
                      helperText={errors.loyalty?.message}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    {...register('edhrec_link', {
                      required: EDHREC_LINK_REQUIRED,
                      pattern: {
                        value: URL_PATTERN,
                        message: EDHREC_LINK_PATTERN_MESSAGE,
                      },
                    })}
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
              <LoadingButton
                type="submit"
                color="primary"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                {CREATE_A_CARD}
              </LoadingButton>
            </Box>
          </Box>
        </>
      </Container>
    </>
  )
}
