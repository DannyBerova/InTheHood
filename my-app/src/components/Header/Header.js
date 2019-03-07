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
              <a href="/" class="brand-logo right">InTheHood</a>
              <ul id="nav-mobile" class="left hide-on-med-and-down">
                <li><a href="/">Home</a></li>
                {isAdmin ? 
                    <li ><a className='grey-text lighten-4' href="/user/all">Users</a></li> : null}
                {isAuth ? 
                (<Fragment>
                    <li><a href="/post/create">Create</a></li>
                    <li><a href={userDetails}>Profile</a></li>
                    <li><a href="/" onClick={this.props.logout}>Logout</a></li>
                    <li className="grey-text lighten-3">Welcome, {this.props.user}!</li>
                    </Fragment>
                ) : (
                <Fragment>
                  <li><a href="/auth/login">Login</a></li>
                  <li><a href="/auth/register">Register</a></li>
                </Fragment>)}
              </ul>
            </div>
          </nav>
        </header>
    );
}

}
export default Header;
