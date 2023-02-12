import { configureStore } from '@reduxjs/toolkit'
import customizationReducer from './reducers/customization/reducer'

export const store = configureStore({
    reducer: {
        customization: customizationReducer,
    },

})
