import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { prepareWallets } from '../helpers/prepareWallets'
import { types } from '../types/types'

export const walletStartAddNew = (wallet) => {
    return async (dispatch, getState) => {

        const {uid, name} = getState().auth

        try {
            
            const response = await fetchWithToken('wallets',wallet,'POST')
            const body = await response.json()

            if(body.status === 200){
                wallet.id = body.wallet.id
                wallet.user = {
                    _id: uid,
                    name: name
                }
                dispatch(walletAddNew(wallet))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const walletAddNew = (wallet) => ({type: types.walletAddNew, payload: wallet})

export const walletSetActive = (wallet) => ({type: types.walletSetActive, payload: wallet})

export const walletClearActiveWallet = () => ({type: types.walletClearActiveWallet})

export const walletStartUpdate = (wallet) =>{
    return async (dispatch) => {
        try {

            console.log(`wallets/${wallet.id}`)

            const response = await fetchWithToken(`wallets/${wallet.id}`,wallet,'PUT')
            const body = await response.json()

            console.log(body)

            if(body.status===200){
                dispatch(walletUpdate(wallet))
            }else{
                Swal.fire('Error',body.message,'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const walletUpdate = (wallet) => ({type: types.walletUpdate, payload: wallet})

export const walletStartDelete = (wallet) => {
    return async (dispatch, getState) => {

        const {id} = getState().wallet.activeWallet

        try {
            const response = await fetchWithToken(`wallets/${id}`,{},'DELETE')
            const body = await response.json()

            if(body.status === 200){
                dispatch(walletDelete(wallet))
            }else{
                Swal.fire('Error',body.message,'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const walletDelete = (wallet) => ({type: types.walletDelete, payload: wallet}) 

export const walletStartLoading = () => {
    return async (dispatch) => {
        try {
            const response = await fetchWithToken('wallets')
            const body = await response.json()

            const wallets = prepareWallets(body.wallets)

            dispatch(walletLoaded(wallets))
        } catch (error) {
            console.log(error)
        }
    }
}

const walletLoaded = ( wallets ) => ({type: types.walletLoaded, payload: wallets})

export const walletLogout = () => ({type: types.walletLogout})

