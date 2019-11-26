import * as types from '../../constants/Company/employee'
export const actGetInfoEmployee = (employee) => {
    return {
        type: types.GET_INFO_EMPLOYEE,
        employee: employee
    }
}

export const actGetListProjectOfEmployee = (projects) => {
    return {
        type: types.GET_LIST_PROJECT_OF_EMPLOYEE,
        projects: projects
    }
}

export const actEditEmployeeProject = (projects) => {
    return {
        type: types.EDIT_EMPLOYEE_PROJECT,
        projects: projects
    }
}

export const actDeleteEmployeeProject = (projects, data) => {
    return {
        type: types.DELETE_EMPLOYEE_PROJECT,
        projects: projects,
        data: data
    }
}