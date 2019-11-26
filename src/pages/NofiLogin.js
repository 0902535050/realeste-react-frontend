import React, { Component } from 'react';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';

class NofiLogin extends Component {
    onLogin = (e) => {
        e.preventDefault();
        this.props.history.push('/login')
    }
    componentDidMount(){
        if(localStorage.getItem('res')){
            this.props.history.push('/submitproperty')
        }
    }
    render() {
        return (
            <div>
                <MainHeader />
                <div className="container">
                    <div className="verify" style={{ height: '50px', paddingTop: '10px', paddingLeft: '10px', marginTop: '70px', backgroundColor: 'lightblue' }}>
                        <h3 style={{ textTransform: 'Uppercase' }}>Bạn chưa đăng nhập</h3>
                    </div>

                    <div className="jumbotron">
                        <h4>Bạn cần đăng nhập để có thể  đăng bài viết!</h4>
                        <button style={{ width: '100px' }} type="button" class="btn btn-block btn-primary" onClick={this.onLogin}>Đăng nhập</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default NofiLogin;