import { useContext } from "react"
import Context from "../global/context"

export const INITIAL_MESSAGE = {
  type: '',
  message: '',
  open: false,
}

const useMessage = () => {
  const { setMessage } = useContext(Context)

  const openMessage = (type = '', message = '') => {
    setMessage({
      type,
      message,
      open: true,
    })
  }

  const closeMessage = () => {
    setMessage((state) => ({
      ...state,
      open: false,
    }))
  }

  return {
    openMessage,
    closeMessage,
  }
}

export default useMessage