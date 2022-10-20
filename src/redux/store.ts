
import {configureStore} from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import userslice from './userslice'

const store=configureStore({
    reducer:{
        User:userslice
    }
})
export default store
export type RootSelector= ReturnType< typeof store.getState>
export type RootDispatch= typeof store.dispatch