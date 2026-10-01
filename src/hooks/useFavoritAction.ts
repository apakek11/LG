import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { useFavorit } from './useFavorit'

export function useFavoritAction(tempatId: string) {
  const { user } = useAuth()
  const { isFavorit, toggleFavorit } = useFavorit()
  const navigate = useNavigate()
  const location = useLocation()

  const favorit = isFavorit(tempatId)

  function toggle() {
    if (!user) {
      navigate('/login', { state: { from: `${location.pathname}${location.search}` } })
      return
    }
    void toggleFavorit(tempatId)
  }

  return { favorit, toggle }
}
