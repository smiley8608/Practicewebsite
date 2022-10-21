
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { InitialStateTypes } from '../types'

const initialState:InitialStateTypes={
    User:null,
    Auth:false
}

const userslice=createSlice({
    name:'User',
    initialState:initialState,
    reducers:{
        setInitialState:(state:InitialStateTypes,action:PayloadAction<InitialStateTypes>)=>{
            state.User=action.payload.User
            state.Auth=action.payload.Auth
        }
    }
})
export const {setInitialState} =userslice.actions
export default userslice.reducer