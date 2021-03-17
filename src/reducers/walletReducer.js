import { types } from "../types/types";


const initialState = {
  wallets: [],
  activeWallet: null,
};

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.walletAddNew:
      return {
        ...state,
        wallets: [...state.wallets, action.payload],
      };
    case types.walletUpdate:
      return {
        ...state,
        wallets: state.wallets.map( wallet =>
          (wallet.id === action.payload.id) ? action.payload : wallet
        ),
      };
    case types.walletDelete:
      return {
        ...state,
        wallets: state.wallets.filter( wallet => wallet.id !== action.payload.id)
      }
    case types.walletSetActive:
      return {
        ...state,
        activeWallet: action.payload,
      };
    case types.walletClearActiveWallet:
      return {
        ...state,
        activeWallet: null
      }
    case types.walletLoaded:
      return {
        ...state,
        wallets: [...action.payload]
      }
    case types.walletLogout:
      return {
        ...initialState
      }
    default:
      return state;
  }
};
