import axios from 'axios'
import * as config from '../constants/Config'
import {authHeader} from '../constants/authHeader'

export const service ={
    logOut,
    verifyEmployee,
    verifyCompany,
    resetPasswordEmployee,
    changePasswordEmployee,
};

function logOut() {
    
}
function verifyEmployee(data){
    return new Promise((resolve,reject) => {
        axios.post(`${config.API_URL}/employee/verifyemloyee`, data )
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function verifyCompany(data){
    return new Promise((resolve,reject) => {
        axios.post(`${config.API_URL}/company/verifycompany`, data )
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}
function resetPasswordEmployee(data){
    return new Promise((resolve,reject) => {
        axios.post(`${config.API_URL}/employee/resetpassword`, data)
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}

function changePasswordEmployee (data){
    return new Promise((resolve,reject) => {
        axios.post(`${config.API_URL}/employee/changepassword`, data, {headers: authHeader() })
        .then(res => {
            if(res.data.status === 200) {
                resolve(res.data);
            } else {
                reject(res.data)
            } 
        })
        .catch(err => reject(err.response))
    });
}