import * as actionAgent from './Agent'
import * as actionCompany from './Company'
import * as actionTotalPage from '../totalPage'
import * as actionUserCompany from '../Company/userCompany'
import axios from 'axios'

import * as config from '../../constants/Config'
// ======Start request get list Agents
//lấy danh sách nhà môi giới
export const reqGetListAgents = (page) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/users/allagent/${page}`,)
      .then(res => {
        // console.log(res);
        dispatch(actionAgent.actGetListAgents(res.data.result));
        dispatch(actionTotalPage.actSaveTotalPage(res.data.count))
      })
      .catch(err => {
        // console.log(err.respone)
      })
  };
}

//lấy thông tin chi tiết 1 nhà môi giới (gồm thông tin cơ bản, và số lượng bài đăng)
export const reqGetInfoAgent = (id, page) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/users/infoagent/${id}/${page}`,)
      .then(res => {
        // console.log(res);
        dispatch(actionAgent.actGetInfoAgent(res.data.info));
        dispatch(actionAgent.actGetListProjectOfAgent(res.data.projects));
        dispatch(actionTotalPage.actSaveTotalPage(res.data.count))
      })
      .catch(err => {
        // console.log(err.respone)
      })
  };
}

//======End request get list agents

//======Start request get list companies

//Lấy danh sách công ty đối tác
export const reqGetListCompanies = (page) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/company/all/${page}`,)
      .then(res => {
        // console.log(res);
        dispatch(actionCompany.actGetListCompanies(res.data.result));
        dispatch(actionTotalPage.actSaveTotalPage(res.data.count))
      })
      .catch(err => {
        // console.log(err.respone)
      })
  };
}

//Lấy thông tin cơ bản của 1 công ty đối tác (thông tin cơ bản, danh sách nhân viên)
export const reqGetInfoCompany = (id) => {
  return dispatch => {
    // return console.log("Company")
    return axios
      .get(`${config.API_URL}/company/info/${id}`,)
      .then(res => {
        // console.log(res);
        let totalPage = parseInt(res.data.company.employees.length /5) + 1
        dispatch(actionCompany.actGetInfoCompany(res.data.company));
        dispatch(actionUserCompany.actSaveListEmployees(res.data.company.employees));
        dispatch(actionTotalPage.actSaveTotalPage(totalPage))
        // dispatch(actionAgent.actGetListProjectOfAgent(res.data.projects));
      })
      .catch(err => {
        // console.log(err.respone)
      })
  };
}
