import storeSynchronize, { defineState } from 'redux-localstore'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const INITIAL = {
	USER: {
		id: null,
		avatar: null,
		username: null,
	},
}

const initialState = defineState({ ...INITIAL })('reducer')

const reducer = (state = initialState, { type, data }) => {
	return { ...state, [type]: data }
}

const store = configureStore({
	reducer: combineReducers({ reducer })
})

storeSynchronize(store)

export default store