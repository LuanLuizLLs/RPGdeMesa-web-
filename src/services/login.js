import { useDispatch } from 'react-redux'

function useLogin() {
  const setDispatch = useDispatch()

  /** Action login */
  const In = (data) => {
    setDispatch({
      type: 'USER', data
    })
  }

  /** Action logout */
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