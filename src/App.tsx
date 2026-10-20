import { lazy, Suspense } from 'react'
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
import { TidakDitemukan } from './pages/TidakDitemukan'

// Halaman admin dipisah ke chunk sendiri supaya pengunjung biasa tidak ikut mengunduhnya.
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })))
const AdminTempat = lazy(() => import('./pages/admin/AdminTempat').then((m) => ({ default: m.AdminTempat })))
const AdminTempatForm = lazy(() => import('./pages/admin/AdminTempatForm').then((m) => ({ default: m.AdminTempatForm })))
const AdminReview = lazy(() => import('./pages/admin/AdminReview').then((m) => ({ default: m.AdminReview })))
const AdminPengguna = lazy(() => import('./pages/admin/AdminPengguna').then((m) => ({ default: m.AdminPengguna })))

function App() {
  return (
    <AuthProvider>
      <FavoritProvider>
        <LocationProvider>
          <BrowserRouter>
            <Suspense fallback={<div className="min-h-screen bg-surface" />}>
              <Routes>
                <Route path="/" element={<Beranda />} />
                <Route path="/jelajahi" element={<Jelajahi />} />
                <Route path="/kategori" element={<Kategori />} />
                <Route path="/favorit" element={<Favorit />} />
                <Route path="/tempat/:id" element={<DetailTempat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/tempat" element={<AdminTempat />} />
                <Route path="/admin/tempat/baru" element={<AdminTempatForm />} />
                <Route path="/admin/tempat/:id" element={<AdminTempatForm key="edit" />} />
                <Route path="/admin/review" element={<AdminReview />} />
                <Route path="/admin/pengguna" element={<AdminPengguna />} />
                <Route path="*" element={<TidakDitemukan />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LocationProvider>
      </FavoritProvider>
    </AuthProvider>
  )
}

export default App
