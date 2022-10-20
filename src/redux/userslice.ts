
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { InitialStateTypes } from '../types'

const initialState:InitialStateTypes={
    user:null,
    auth:true
}

const userslice=createSlice({
    name:'User',
    initialState:initialState,
    reducers:{
        setInitialState:(state:InitialStateTypes,action:PayloadAction<InitialStateTypes>)=>{
            state.user=action.payload.user
            state.auth=action.payload.auth
        }
    }
})
export const {setInitialState} =userslice.actions
export default userslice.reducer