import { combineReducers } from 'redux';
import user from './user';
import estates from './estates';
import news from './news'
import newsDetail from './newsdetail'
import estateInfo from './InfoEstate';
import location from './Map/location'
import address from './address'
import comments from './comments'
import estatesListOfUser from './estatesListOfUser'
import follow from './follow'
import totalPage from './totalPage'
import auth from './auth'
import searchEstate from './searchEstate'
import currentEstate from './currentEstate'
import loading from './loading'
//=====company
import userCompany from './Company/userCompany'
import employees from './Company/employees'
import infoEmployee from './Company/infoEmployee'
import projectsOfEmployee from './Company/listProjectOfEmployee'
//=====
import transaction from './Transaction/transaction'
import transactionDetail from './Transaction/transactionDetail'
import rentTransaction from './Transaction/rentTransaction'
import waiting from './Transaction/waiting'
import agents from './Contact/agent'        //danh sách nhà môi giới
import companies from './Contact/company'   //danh sách công ty đối tác
import infoAgent from './Contact/infoAgent' //info cuả nhà môi giới
import projectsOfAgent from './Contact/listProjectsOfAgent'
import infoCompany from './Contact/infoCompany'

const appReducers = combineReducers({
    user,
    estates,
    estateInfo,
    news,
    newsDetail,
    location,
    address,
    comments,
    estatesListOfUser,
    follow,
    totalPage,
    auth,
    searchEstate,
    currentEstate,
    loading,
    // company
    userCompany,
    employees,
    infoEmployee,
    projectsOfEmployee,
    //-------
    transaction,
    transactionDetail,
    rentTransaction,
    waiting,
    agents,
    companies,
    infoAgent,
    projectsOfAgent,
    infoCompany
});

export default appReducers;