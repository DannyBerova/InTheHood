import React, { Component, Fragment } from 'react';
import {NavLink} from 'react-router-dom';

class Header extends Component {
  
    render() {
        let isAuth = (this.props.isLoggedIn)
        let isAdmin = (this.props.isAdmin)
        let userDetails = `/user/details/${this.props.userId}`
        return (
        <header>
          <nav>
            <div className="nav-wrapper teal darken-3">
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                {isAdmin ? 
                    <li ><NavLink className='grey-text lighten-4' to="/user/all">Users</NavLink></li> : null}
                {isAuth === true ? 
                (<Fragment>
                    <li><NavLink to="/post/create">Create</NavLink></li>
                    <li><NavLink to={userDetails} onClick={this.toProfile}>Profile</NavLink></li>
                    <li><NavLink to="/" onClick={this.props.logout}>Logout</NavLink></li>
                    </Fragment>
                ) : (
                <Fragment>
                  <li><NavLink to="/auth/login">Login</NavLink></li>
                  <li><NavLink to="/auth/register">Register</NavLink></li>
                </Fragment>)}
              </ul>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {isAuth ? (
                  <Fragment>
                    <li className="grey-text lighten-3">Welcome, {this.props.user}!</li>
                    </Fragment>
                ) : ( null)}
                 <li><NavLink style={{fontSize: 25 + 'px'}}  to="/">InDaHood</NavLink></li>
              </ul>
            </div>
          </nav>
        </header>
    );
}

}
export default Header;
