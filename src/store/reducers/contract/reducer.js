import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: undefined,
    admin: undefined,
    name: undefined,
    owner: undefined,
    address: undefined,
    decimalsToken: undefined,
    symbolToken: undefined,
    balance: undefined,
    amountEmployee: undefined,
    arrEmployee: []
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
        setDecimalsToken: (state, action) => {
            state.decimalsToken = action.payload
        },
        setSymbolToken: (state, action) => {
            state.symbolToken = action.payload
        },
        setBalance: (state, action) => {
            state.balance = action.payload
        },
        setAmountEmployee: (state, action) => {
            state.amountEmployee = action.payload
        },
        setArrEmployee: (state, action) => {
            state.arrEmployee = action.payload
        },
        
    },
})

export const { setArrEmployee, setBalance, setAmountEmployee, setAddress, setToken, setAdmin, setName, setOwner, setDecimalsToken, setSymbolToken } = contractSlice.actions

export const contractSelector = (state) => state.contract;

export default contractSlice.reducer
