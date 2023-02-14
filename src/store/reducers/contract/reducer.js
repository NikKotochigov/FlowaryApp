import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: undefined,
    token: undefined,
    admin: undefined,
    name: undefined,
    owner: undefined
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
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

export const { setAddress, setToken, setAdmin, setName, setOwner } = contractSlice.actions

export const contractSelector = (state) => state.contract;

export default contractSlice.reducer
