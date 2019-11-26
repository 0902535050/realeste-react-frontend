import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import Login from './pages/Login';
import Login2 from './pages/Login2';
import Home from './pages/Home';
import SubmitProperty from './pages/SubmitProperty'
import Map from './pages/Map'
import Profile from './pages/Profile'
import Properties from './pages/Properties'
import EstateListGridView from './pages/EstateList_GridView'
import MyEstateList from './pages/MyEstateList'
import ChangePassword from './pages/Employee/ChangePasswordEmployee'
import NotFound from './pages/404'
import test from './pages/test'
import HomeMap from './pages/Map/HomeMap'
import EstateListListView from './pages/EstateList_ListView'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import MapOfDetail from './components/Properties/MapOfDetailEstate'
import EditUI from './components/My Properties/EditUI'
import MyFollowing from './pages/MyFollowing'
import MyTransaction from './pages/MyTransaction'
import TransHistory from './pages/TransHistory'
import TransactionDetail from './pages/TransactionDetail'
import WaitingRequest from './pages/WaitingRequest'
import AboutUs from './pages/AboutUs.js'
import NotiLogin from './pages/NofiLogin'
import MainHeader from './components/MainHeader'
import Footer from './components/Footer'

import VerifyEmployee from './pages/Verify/VerifyEmployee'
import VerifyCompany from './pages/Verify/VerifyCompany'
import ForgotPasswordEmployee from './pages/Employee/ForgotPasswordEmployee'
// import Test from './pages/Map/test'

//import component agent
import ListAgents from './pages/Contact/ListAgents'
import ListCompaies from './pages/Contact/ListCompanies'
import AgentDetail from './pages/Contact/AgentDetail'
import CompanyDetail from './pages/Contact/CompanyDetail'
//==============
//=====import component cho company
import LoginCompany from './pages/Company/LoginCompany'
import ProfileAdmin from './pages/Company/ProfileAdmin'
import ListEmployees from './pages/Company/ListEmployees'
import AddAccount from './pages/Company/AddAccount'
import ChangePasswordCompany from './pages/Company/ChangePasswordCompany'
import ForgotPasswordCompany from './pages/Company/ForgotPasswordCompany'
import ProfileEmployee from './pages/Company/ProfileEmployee'
import InputNumber from './components/Company/InputNumber';
import EditEstate from './components/Employee Estate/EditEstate'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/test' component={test} />
              <Route exact path='/homee' component={Home} />
              <Route exact path='/' component={HomeMap} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/login2' component={Login2} />
              <Route exact path='/submitproperty' component={SubmitProperty} />
              <Route exact path='/maps' component={Map} />
              <Route exact path='/profile' component={Profile} />
              <Route path='/properties/:id' component={Properties} />
              <Route exact path='/estategridview' component={EstateListGridView} />
              <Route exact path='/estatelistview' component={EstateListListView} />
              <Route exact path='/myproperties' component={MyEstateList} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/news" component={News} />
              <Route exact path="/news/:id" component={NewsDetail} />
              {/* <Route exact path='/homemaps' component={HomeMap} /> */}
              <Route exact path='/demo' component={MapOfDetail} />
              <Route path='/myproperties/edit/:id' component={EditUI} />
              <Route exact path='/myfollowing' component={MyFollowing} />
              <Route exact path='/mytransactions' component={MyTransaction} />
              <Route path='/mytransactions/:id/:type' component={TransactionDetail} />
              <Route exact path='/transhistory' component={TransHistory} />
              <Route exact path='/waiting' component={WaitingRequest} />
              <Route exact path='/about' component={AboutUs} />
              <Route exact path='/notilogin' component={NotiLogin} />
              {/* <Route exact path='/testing' component={Test} /> */}

              <Route exact path='/verifyemployee/:idc/:ide/:hash' component={VerifyEmployee} />
              <Route exact path='/verifycompany/:id/:hash' component={VerifyCompany} />

              <Route exact path='/forgotpassword' component={ForgotPasswordEmployee} />
              {/* Agent */}
              <Route exact path='/agents/:page' component={ListAgents} />
              <Route exact path='/companies/:page' component={ListCompaies} />
              <Route exact path='/agentdetail/:id/:page' component={AgentDetail} />
              <Route exact path='/companydetail/:id' component={CompanyDetail} />
              {/* ---------- */}
              {/* Route cho company */}

              <Route exact path='/input' component={InputNumber} />
              <Route exact path='/company/login' component={LoginCompany} />
              <Route exact path='/company/profile-admin' component={ProfileAdmin} />
              <Route exact path='/company/add-account-employee' component={AddAccount} />
              <Route exact path='/company/list-employees' component={ListEmployees} />
              <Route exact path='/company/changepassword' component={ChangePasswordCompany} />
              <Route exact path='/company/forgotpassword' component={ForgotPasswordCompany} />
              <Route exact path='/company/info-employee/:id/:page' component={ProfileEmployee} />
              <Route exact path='/company/edit-estate/:id' component={EditEstate} />
              {/* End route cho company */}
              <Route exact path='' component={NotFound} />

            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

export default App;
