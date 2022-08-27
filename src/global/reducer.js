   
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
    /** Initial reducer */ 
    return { ...INITIAL_REDUCER }
  else if (data === 'RESET')
    /** Reset specific data */
    return { ...state, [type]: INITIAL_REDUCER[type] }
  else
    /** Save data in reducer */
    return { ...state, [type]: data }
}

const store = configureStore({
  reducer: combineReducers({ reducer })
})

storeSynchronize(store)

export default store