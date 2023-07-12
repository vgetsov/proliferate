import { Route, Routes } from 'react-router-dom'

import { SignUp } from './components/SignUp/SignUp'
import { Navbar } from './components/Navbar/Navbar'
import { LogIn } from './components/LogIn/LogIn'
import { Home } from './components/Home/Home'
import { CreateCard } from './components/Card/CreateCard'
import { CardDetailsPage } from './components/Card/CardDetailsPage'

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/cards/:id" element={<CardDetailsPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
