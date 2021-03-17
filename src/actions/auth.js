
import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { walletLogout } from "./wallet";


export const startLogin = (email, password) => {
    
    return async (dispatch) => {
        const response = await fetchWithoutToken('auth', {email, password} ,'POST')
        const body = await response.json()

        if(body.status===200){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-data', new Date().getTime())

            dispatch(authLogin({uid: body.uid, name: body.name}))
        }else{
            Swal.fire('Error', body.message, 'error')
        }
    } 
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        const response = await fetchWithoutToken('auth/new',{email, password, name}, 'POST')
        const body = await response.json()

        if(body.status===201){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-data',new Date().getTime())

            dispatch(authLogin({uid: body.uid, name: body.name}))
        }else{
            Swal.fire('Error',body.message,'error')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {

        const response = await fetchWithToken('auth/renew')
        const body = await response.json()

        if(body.status ===200){
            localStorage.setItem('token',body.token)
            localStorage.setItem('token-init-data', new Date().getTime())

            dispatch(authLogin({uid: body.uid, name: body.name}))
        }else{
            dispatch(finishChecking())
        }
    }
}

const finishChecking = () => ({type: types.authCheckingFinish})

const authLogin = (user) => ({type: types.authLogin, payload: user})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(walletLogout())
        dispatch(authLogout())
    }
}

const authLogout = () => ({type: types.authLogout})