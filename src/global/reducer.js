   
import storeSynchronize, { defineState } from 'redux-localstore'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

/** Global reducer */
const INITIAL_REDUCER = {
  USER: {},
  CAMPAIGN: {},
  CHARACTER: {},
}

const initialState = defineState(INITIAL_REDUCER)('reducer')

const reducer = (state = initialState, { type, data }) => {
  if (type === 'INITIAL')
    return INITIAL_REDUCER
  else
    return { ...state, [type]: data }
}

const store = configureStore({
  reducer: combineReducers({ reducer })
})

storeSynchronize(store)

export default store