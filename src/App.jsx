import { Route, Routes } from 'react-router-dom'
import Dashboard from './routes/Dashboard/Dashboard.jsx'
import AppLayout from './layout/AppLayout.jsx'
import Login from './routes/Auth/Login.jsx'


function App() {

  return (
    <AppLayout>
    <Routes>
      <Route path="" element={<Dashboard/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Login/>} />
    </Routes>
    </AppLayout>
  )
}

export default App
