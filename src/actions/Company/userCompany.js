import * as types from '../../constants/Company/userCompany';
// import employees from '../../reducers/Company/employees';
export const actSaveInfoUserCompany = (user) =>{
    return {
        type: types.SAVE_INFO_USER_COMPANY,
        userCompany: user
    }
}
export const actSaveListEmployees = (employees) => {
    return { 
        type: types.SAVE_LIST_EMPLOYEES,
        employees: employees
    }
}