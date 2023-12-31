import { Helmet } from 'react-helmet-async'

import { CardsList } from '../Card/CardsList'

import { HOME_PAGE_TILE } from '../../common/constants'

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>{HOME_PAGE_TILE}</title>
      </Helmet>
      <>
        <CardsList />
      </>
    </>
  )
}
