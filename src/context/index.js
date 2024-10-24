import * as INITIAL from './constants'
import { createContext, useContext, useState } from 'react'

export { INITIAL }

const Context = createContext({
	stateLoading: [INITIAL.LOADING],
	stateMessage: [INITIAL.MESSAGE],
})

function GlobalContextProvider({ children }) {
	const valueContext = {
		stateLoading: useState(INITIAL.LOADING),
		stateMessage: useState(INITIAL.MESSAGE),
	}

	return (
		<Context.Provider value={valueContext}>
			{children}
		</Context.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(Context)
}

export default GlobalContextProvider