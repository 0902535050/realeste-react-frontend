import * as types from '../../constants/Contact/Company'
export const actGetListCompanies =(companies) =>{
    return {
        type: types.GET_LIST_COMPANIES,
        companies: companies
    }
}

export const actGetInfoCompany = (company)  => {
    return {
        type: types.GET_INFO_COMPANY,
        company: company
    }
}