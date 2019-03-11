import React, { Component, Fragment } from 'react';

class HomeWelcomeBlock extends Component {
    render() {
        let isAuth = this.props.isLoggedIn;
        return(isAuth ? (
            <Fragment>
                <h5 className='teal-text'>Welcome in the hoood... Slatina hood! Get the news!</h5>
            </Fragment>
            ) : (
            <Fragment>
                <h4>
                  <span><a class="waves-effect teal darken-1 waves-light btn-small" href='auth/register'><i class="material-icons left white-text">border_color</i>Register</a></span>
                  <span>   Welcome in the hoood...   </span>
                  <span><a class="waves-effect teal darken-1  waves-light btn-small" href="/auth/login"><i class="material-icons left">border_color</i>Log In</a></span>
                </h4>
                <h4>Slatina hood! Log in to see all the stuff.</h4>
            </Fragment>
            )
        )
    }
}

export default HomeWelcomeBlock;