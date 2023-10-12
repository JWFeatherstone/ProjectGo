import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard.jsx'
import AppLayout from '../layout/AppLayout.jsx'
import Login from './Auth/Login.jsx'
import About from './About/About.jsx'
import Browser from './Browser/Browser'
import Profile from './Profile/Profile'
import Map from './Map/Map.jsx'


function App() {

  return (
    <AppLayout>
      <Routes>
        <Route path="" element={<Map />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/browser" element={<Browser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </AppLayout>
  )
}

export default App
