import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import * as Config from '../constants/Config'
class Login2 extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: null,
            token: ''
        };
    }
    logout = () => {
        this.setState({
            isAuthenticated: false,
            token: '', user: null
        })
    };
    googleResponse = (response) => {
        // const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        // const options = {
        //     method: 'POST',
        //     body: tokenBlob,
        //     mode: 'cors',
        //     cache: 'default'
        // };
        // fetch('http://localhost:3001/api/v1/auth/google', options).then(r => {
        //     const token = r.headers.get('x-auth-token');
        //     r.json().then(user => {
        //         if (token) {
        //             this.setState({isAuthenticated: true, user, token})
        //         }
        //     });
        // })
        console.log(response);
    };
    onFailure = (error) => {
        alert(error);
    }
    render() {
        let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId={Config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                type="submit"
                                className="button-google btn-block"
                                style={{ border: "solid 1px black" }}
                            >
                                <img src="/images/icons/icon-google.png" alt="GOOGLE" style={{ marginRight: "10px", width: "18px" }} />
                                Login With Google
                            </button>
                        )}
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default Login2;

// <div className="content-area">
            //     <div className="container">
            //         <div className="row">
            //             <div className="col-lg-12">
            //                 {/* Form content box start */}
            //                 <div className="form-content-box">
            //                     {/* details */}
            //                     <div className="details">
            //                         {/* Main title */}
            //                         <div className="main-title">
            //                             <h1>
            //                                 <span>Login</span>
            //                             </h1>
            //                         </div>
            //                         {/* Form start */}
            //                         <form
            //                             action="http://themevessel-item.s3-website-us-east-1.amazonaws.com/nest/index.html"
            //                             method="GET"
            //                         >
            //                             <div style={{ marginBottom: '10px' }}>
            //                                 <a className="btn-google m-b-20" href>
            //                                     <img src="images/icons/icon-google.png" alt="GOOGLE" />
            //                                     Google
            //                                 </a>
            //                             </div>
            //                             <div className="form-group">
            //                                 <input
            //                                     type="email"
            //                                     name="email"
            //                                     className="input-text"
            //                                     placeholder="Email Address"
            //                                 />
            //                             </div>
            //                             <div className="form-group">
            //                                 <input
            //                                     type="password"
            //                                     name="Password"
            //                                     className="input-text"
            //                                     placeholder="Password"
            //                                 />
            //                             </div>
            //                             <div className="checkbox">
            //                                 <div className="ez-checkbox pull-left">
            //                                     <label>
            //                                         <input type="checkbox" className="ez-hide" />
            //                                         Remember me
            //                                 </label>
            //                                 </div>
            //                                 <a
            //                                     href="forgot-password.html"
            //                                     className="link-not-important pull-right"
            //                                 >
            //                                     Forgot Password
            //                                 </a>
            //                                 <div className="clearfix" />
            //                             </div>
            //                             <div className="form-group">
            //                                 <button
            //                                     type="submit"
            //                                     className="button-md button-theme btn-block"
            //                                 >
            //                                     login
            //                                 </button>
            //                             </div>
            //                         </form>
            //                         {/* Form end */}
            //                     </div>
            //                     {/* Footer */}
            //                     <div className="footer">
            //                         <span>
            //                             New to Tempo? <a href="signup.html">Sign up now</a>
            //                         </span>
            //                     </div>
            //                 </div>
            //                 {/* Form content box end */}
            //             </div>
            //         </div>
            //     </div>
            // </div>