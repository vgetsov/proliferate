import { Helmet } from 'react-helmet-async'
import { WelcomingMessage } from './WelcomingMessage'
import { CardsList } from '../Card/CardsList'

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Proliferate - Home</title>
      </Helmet>
      <>
        <WelcomingMessage />
        <CardsList />
      </>
    </>
  )
}
