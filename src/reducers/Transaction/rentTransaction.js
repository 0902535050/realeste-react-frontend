import * as Types from '../../constants/Transaction/transaction'

var initialState = {};

const rentTransaction = (state = initialState, action) => {
    switch (action.type) {
        case Types.RENTING_DEAL:
            // console.log(action, state)
            return { ...state }
        case Types.RENTING_DEPOSIT:
            state = action.deposit
            // console.log(action, state)
            return { ...state }
        case Types.RENTING_CONTRACT:
            // console.log(action, state)
            state = action.contract
            return { ...state }
        case Types.RENTING_CONFIRMATION:
            // console.log(action, state)
            return { ...state }
        case Types.RENTING_DELIVERY:
            // console.log(action, state)
            return { ...state }
        default: return { ...state };
    }

}
export default rentTransaction;