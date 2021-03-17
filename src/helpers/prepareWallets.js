import moment from 'moment'

export const prepareWallets = (wallets = []) => {
    return wallets.map(wallet => ({
        ...wallet,
        date: moment(wallet.date).toDate(),
    }))
}