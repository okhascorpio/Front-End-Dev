//const configureStore = require('@reduxjs/toolkit').configureStore
//const quoteReducer = require('../features/quote/quoteSlice')
import { configureStore } from "@reduxjs/toolkit"
import quoteReducer from '../features/quote/quoteSlice'

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
    },
})

