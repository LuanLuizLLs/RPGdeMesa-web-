import { useDispatch } from 'react-redux'

function useLogin() {
  const setDispatch = useDispatch()

  /** Log in */
  const In = (data) => {
    setDispatch({
      type: 'USER', data
    })
  }

  /** Log out */
  const Out = () => {
    setDispatch({
      type: 'INITIAL'
    })
  }

  return {
    In,
    Out,
  }
}

export default useLogin