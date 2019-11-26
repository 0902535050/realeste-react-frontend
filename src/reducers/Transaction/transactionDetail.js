import * as Types from '../../constants/Transaction/transaction'

var initialState = {};

const transactionDetail = (state = initialState, action) => {
    switch (action.type) {
        case Types.DEAL:
            // console.log(action, state)
            state = action.deal
            return { ...state }
        case Types.LEGALITY:
            // console.log(action, state)
            state = action.legality
            return { ...state }
        case Types.DEPOSIT:
            state = action.deposit
            // console.log(action, state)
            return { ...state }
        case Types.CONTRACT:
            // console.log(action, state)
            state = action.contract
            return { ...state }
        case Types.CONFIRMATION:
            // console.log(action, state)
            state = action.confirmation
            return { ...state }
        case Types.TAX:
            // console.log(action, state)
            state = action.tax
            return { ...state }
        case Types.DELIVERY:
            // console.log(action, state)
            state = action.delivery
            return { ...state }
        case Types.TRANSFER:
            // console.log(action, state)
            state = action.transfer
            return { ...state }

        default: return { ...state };
    }

}
export default transactionDetail;