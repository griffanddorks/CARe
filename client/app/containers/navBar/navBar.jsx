import React from 'react';
import Auth from '../../../Auth/Auth.js';
const auth = new Auth();

export default class NavBar extends React.Component{
    constructor() {
        super();
    } 

    login() {
        auth.login();
    }

    logout() {
        auth.logout();
    }

    render(){
        return (
            <nav className="navbar navbar-default navbar-expand-lg fixed-top">
                <div className="container">
                <a className="navbar-brand" href="#">CARe</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">Menu</span>
                </button>
                <div className="collapse navbar-collapse navbar-default" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        {
                            !auth.isAuthenticated() && (
                                <li className="nav-item" onClick={this.login}>
                                    <a className="nav-link" href="#">SIGN UP | LOGIN</a>
                                </li>
                            )
                        }
                        {
                            auth.isAuthenticated() && (
                                <li className="nav-item" onClick={this.logout}>
                                    <a className="nav-link" href="#">LOGOUT</a>
                                </li>
                            )
                        }
                    </ul>
                </div>
                </div>
            </nav>
        );
    }
}