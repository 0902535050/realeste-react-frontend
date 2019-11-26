import * as Types from '../../constants/Transaction/transaction'

var initialState = [];

const transaction = (state = initialState, action) => {
    var index = -1
    switch (action.type) {
        case Types.CREATE_TRANSACTION:
            // console.log(action, state)
            state = action.transaction
            return { ...state }
        case Types.CHANGE_STATUS:
            // console.log(action, state)
            return { ...state }
        case Types.TRANSACTION_DETAIL:
            // console.log(action, state)
            state = action.transaction
            return { ...state }
        case Types.TRANSACTION_HISTORY:
            // console.log(action, state)
            state = action.transaction
            return [...state]
        case Types.TRANSACTION_COMPLETE:
            // console.log(action)
            state = action.transactionId
            return { ...state }
        case Types.TRANSACTION_CANCEL:
            // console.log(action)
            index = state.findIndex(transaction => { return transaction._id === action.transaction })
            state.splice(index, 1)
            // console.log(state)
            return [...state]
        default: return { ...state };
    }

}
export default transaction;