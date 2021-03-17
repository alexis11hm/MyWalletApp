import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { walletStartLoading } from '../../actions/wallet'
import { AppbarWallet } from './AppbarWallet'
import { ContentWallet } from './ContentWallet'
import { ModalWallet } from './ModalWallet'

export const WalletScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(walletStartLoading())
    }, [dispatch])

    return (
        <div>
           <AppbarWallet /> 
           <ContentWallet />
           <ModalWallet />
        </div>
    )
}
