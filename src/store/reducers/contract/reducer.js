import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contract: undefined,
    admin: undefined,
    name: undefined,
    owner: undefined
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload
        },
        setAdmin: (state, action) => {
            state.admin = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setOwner: (state, action) => {
            state.owner = action.payload
        },
    },
})

export const { setContract, setAdmin, setName, setOwner } = contractSlice.actions

export const contractSelector = (state) => state.contract;

export default contractSlice.reducer
