import { useContext } from 'react'
import Context from '../global/context'

export const INITIAL_LOADING = {
  type: ''
}

const useLoading = () => {
  const { setLoading } = useContext(Context)

  const startLoading = (type = '') => {
    setLoading({
      type,
    })
  }

  const stopLoaging = () => {
    setLoading(INITIAL_LOADING)
  }

  return {
    startLoading,
    stopLoaging,
  }
}

export default useLoading