import * as Types from '../constants/Transaction/transaction'
import { ADD_WAITING_REQUEST, GET_REQUEST_LIST, DELETE_WAITING_REQUEST } from '../constants/Transaction/waiting'

//Transaction API
export const actCreateTransaction = (transaction) => {
    return {
        type: Types.CREATE_TRANSACTION,
        transaction: transaction
    }
}

export const actChangeStatus = (transaction) => {
    return {
        type: Types.CHANGE_STATUS,
        transaction: transaction
    }
}

export const actGetTransactionHistory = (transaction) => {
    return {
        type: Types.TRANSACTION_HISTORY,
        transaction: transaction
    }
}

export const actGetTransactionDetail = (transaction) => {
    return {
        type: Types.TRANSACTION_DETAIL,
        transaction: transaction
    }
}

export const actCompletingTransaction = (transactionId) => {
    return {
        type: Types.TRANSACTION_COMPLETE,
        transactionId: transactionId
    }
}

export const actCancelTransaction = (transaction) => {
    return {
        type: Types.TRANSACTION_CANCEL,
        transaction: transaction
    }
}
// Selling Transaction API
export const actPostingDeal = (deal) => {
    return {
        type: Types.DEAL,
        deal: deal
    }
}

export const actPostingLegality = (legality) => {
    return {
        type: Types.LEGALITY,
        legality: legality
    }
}

export const actPostingDeposit = (deposit) => {
    return {
        type: Types.DEPOSIT,
        deposit: deposit
    }
}

export const actPostingContract = (contract) => {
    return {
        type: Types.CONTRACT,
        contract: contract
    }
}

export const actPostingConfirmation = (confirmation) => {
    return {
        type: Types.CONFIRMATION,
        confirmation: confirmation
    }
}

export const actPostingTax = (tax) => {
    return {
        type: Types.TAX,
        tax: tax
    }
}

export const actPostingDelivery = (delivery) => {
    return {
        type: Types.DELIVERY,
        delivery: delivery
    }
}

export const actPostingTransfer = (transfer) => {
    return {
        type: Types.TRANSFER,
        transfer: transfer
    }
}

//Waiting Request API
export const actGettingRequestList = (waiting) => {
    return {
        type: GET_REQUEST_LIST,
        waiting: waiting
    }
}

export const actAddingWaitingRequest = (waiting) => {
    return {
        type: ADD_WAITING_REQUEST,
        waiting: waiting
    }
}

export const actDeletingWaitingRequest = (waiting) => {
    return {
        type: DELETE_WAITING_REQUEST,
        waiting: waiting
    }
}

//Renting Transaction API
export const actPostingRentingDeal = (deal) => {
    return {
        type: Types.RENTING_DEAL,
        deal: deal
    }
}

export const actPostingRentingDeposit = (deposit) => {
    return {
        type: Types.RENTING_DEPOSIT,
        deposit: deposit
    }
}

export const actPostingRentingContract = (contract) => {
    return {
        type: Types.RENTING_CONTRACT,
        contract: contract
    }
}

export const actPostingRentingConfirmation = (confirmation) => {
    return {
        type: Types.RENTING_CONFIRMATION,
        confirmation: confirmation
    }
}

export const actPostingRentingDelivery = (delivery) => {
    return {
        type: Types.RENTING_DELIVERY,
        delivery: delivery
    }
}

