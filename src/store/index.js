import { configureStore } from '@reduxjs/toolkit'
import customizationReducer from './reducers/customization/reducer'
import contractReducer from './reducers/contract/reducer'

export const store = configureStore({
    reducer: {
        customization: customizationReducer,
        contract: contractReducer,
    },
    

})
