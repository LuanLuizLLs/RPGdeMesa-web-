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

  const stopLoading = () => {
    setLoading(INITIAL_LOADING)
  }

  return {
    startLoading,
    stopLoading,
  }
}

export default useLoading