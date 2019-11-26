import * as action from './userCompany'
import * as actionEmployee from './employee'
import axios from 'axios'
import { authCompany } from "../../constants/Company/authCompany";
import * as config from '../../constants/Config'
import * as actionAuth from '../auth'
// import callApi from "../../utils/apiCaller";
import { message } from 'antd';
export const actGetInfoUserCompany = (id) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/company/infoprivate`, { headers: authCompany() })
      .then(res => {
        dispatch(actionAuth.actCheckAuth(true))
        dispatch(action.actSaveInfoUserCompany(res.data.company));
        dispatch(action.actSaveListEmployees(res.data.company.employees))
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.status === 401) {
            localStorage.removeItem('company')
            dispatch(actionAuth.actCheckAuth(false))
          }
          else {
            message.error('Lỗi, không lấy được dữ liệu!')
          }
        }
        else {
          message.error('Lỗi, kiểm tra lại đường truyền hoặc server!')
        }
      })
  };
}
export const reqGetInfoEmployee = (id, page) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/company/infoemployee/${id}/${page}`, { headers: authCompany() })
      .then(res => {
        dispatch(actionAuth.actCheckAuth(true))
        dispatch(actionEmployee.actGetInfoEmployee(res.data.info));
        dispatch(actionEmployee.actGetListProjectOfEmployee(res.data.projects))
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data.status === 401) {
            localStorage.removeItem('company')
            dispatch(actionAuth.actCheckAuth(false))
          }
          else {
            message.error('Có lỗi xảy ra!')
          }
        }
        else {
          message.error('Lỗi, kiểm tra lại đường truyền hoặc server!')
        }
      })
  };
}

export const actEditEmployeeProjectRequest = (id, data) => {
  return dispatch => {
    axios.post(`${config.API_URL}/company/editProject/${id}`, data, { headers: authCompany() })
      .then(res => {
        if (res.data.status === 200) {
          dispatch(actionEmployee.actEditEmployeeProject(res.data))
          message.success("Cập nhật bài đăng thành công!")
        }
      })
      .catch(err => {
        if (err.response.data.status === 401) {
          localStorage.removeItem('company')
          dispatch(actionAuth.actCheckAuth(false))
        }
        else {
          message.error('Có lỗi xảy ra!')
        }
      })
  }
}

export const actDeleteEmployeeProjectRequest = (id, data) => {
  return dispatch => {
    axios.delete(`${config.API_URL}/company/${id}`, { data: data, headers: authCompany() })
      .then(res => {
        if (res.data.status === 200) {
          dispatch(actionEmployee.actDeleteEmployeeProject(res.data, data))
          message.success('Xóa bài đăng thành công!')
        }
      })
      .catch(err => {
        if (err.response.data.status === 401) {
          localStorage.removeItem('company')
          dispatch(actionAuth.actCheckAuth(false))
        }
        else {
          message.error('Có lỗi xảy ra!')
        }
      })
  }
}
