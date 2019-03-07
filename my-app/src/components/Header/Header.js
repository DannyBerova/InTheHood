import React, { Component, Fragment } from 'react';

class Header extends Component {

    render() {
        let isAuth = (this.props.userId)
        let isAdmin = (this.props.isAdmin)
        let userDetails = `/user/details/${this.props.userId}`
        return (
        <header>
          <nav>
            <div className="nav-wrapper teal darken-3">
              
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                {isAdmin ? 
                    <li ><a className='grey-text lighten-4' href="/user/all">Users</a></li> : null}
                {isAuth ? 
                (<Fragment>
                    <li><a href="/post/create">Create</a></li>
                    <li><a href={userDetails}>Profile</a></li>
                    <li><a href="/" onClick={this.props.logout}>Logout</a></li>
                    </Fragment>
                ) : (
                <Fragment>
                  <li><a href="/auth/login">Login</a></li>
                  <li><a href="/auth/register">Register</a></li>
                </Fragment>)}
              </ul>
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                {isAuth ? (
                  <Fragment>
                    <li className="grey-text lighten-3">Welcome, {this.props.user}!</li>
                    </Fragment>
                ) : ( null)}
                 <li><a style={{fontSize: 25 + 'px'}}  href="/">InTheHood</a></li>
              </ul>
            </div>
          </nav>
        </header>
    );
}

}
export default Header;
