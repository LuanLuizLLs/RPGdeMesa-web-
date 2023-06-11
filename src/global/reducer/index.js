   
import storeSynchronize, { defineState } from 'redux-localstore'
import { INITIAL } from './initial'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const initialState = defineState(INITIAL)('reducer')

const reducer = (state = initialState, { type, data }) => {
	if (type === 'INITIAL') 
		return { ...INITIAL }
	else 
		return { ...state, [type]: data }
}

const store = configureStore({
	reducer: combineReducers({ reducer })
})

storeSynchronize(store)

export default store