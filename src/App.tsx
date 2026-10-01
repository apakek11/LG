import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritProvider } from './context/FavoritContext'
import { LocationProvider } from './context/LocationContext'
import { Beranda } from './pages/Beranda'
import { DetailTempat } from './pages/DetailTempat'
import { Favorit } from './pages/Favorit'
import { Jelajahi } from './pages/Jelajahi'
import { Kategori } from './pages/Kategori'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  return (
    <AuthProvider>
      <FavoritProvider>
        <LocationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/jelajahi" element={<Jelajahi />} />
              <Route path="/kategori" element={<Kategori />} />
              <Route path="/favorit" element={<Favorit />} />
              <Route path="/tempat/:id" element={<DetailTempat />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </FavoritProvider>
    </AuthProvider>
  )
}

export default App
