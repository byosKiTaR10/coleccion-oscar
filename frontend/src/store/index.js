import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../store/storelogin';
const store = configureStore({
reducer: {
    login: loginReducer
}
})
export default store