import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: undefined,
    name: undefined,
    owner: undefined,
    contractAdd: undefined
}

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setOwner: (state, action) => {
            state.owner = action.payload
        },
        setContractAdd: (state, action) => {
            state.contractAdd = action.payload
        },
    },
})

export const { setToken, setName, setOwner, setContractAdd } = contractSlice.actions

export const contractSelector = (state) => state.contract;

export default contractSlice.reducer
