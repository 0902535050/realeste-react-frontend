import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class NotFound extends Component {
    onRedirectHome = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Error404 content start */}
                            <div className="error404-content">
                                <h1>404</h1>
                                <h2>Something is wrong</h2>
                                <p>The page you are looking for was moved, removed, renamed or might never.</p>
                                <form method="post">
                                    <button type="submit" className="button-sm out-line-btn" onClick={this.onRedirectHome}>Back to home page</button>
                                </form>
                            </div>
                            {/* Error404 content end */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default (withRouter(NotFound));
