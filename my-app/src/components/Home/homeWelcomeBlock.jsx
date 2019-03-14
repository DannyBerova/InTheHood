import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

class HomeWelcomeBlock extends Component {
    render() {
        let isAuth = this.props.isLoggedIn;
        return(isAuth ? (
            <Fragment>
                <h5 className='teal-text'>Welcome in da hoood... Get the news!</h5>
            </Fragment>
            ) : (
            <Fragment>
                <h4>
                  <span>
                      <Link className="waves-effect teal darken-1 waves-light btn-small" to='auth/register'>
                        <i className="material-icons left white-text">border_color</i>Register
                        </Link>
                    </span>
                  <span>   Welcome in da hoood...   </span>
                  <span>
                      <Link className="waves-effect teal darken-1 waves-light btn-small" to='auth/login'>
                        <i className="material-icons left white-text">border_color</i>Log In
                        </Link>
                    </span>
                </h4>
                <h4> Log in to see all the stuff.</h4>
            </Fragment>
            )
        )
    }
}

export default HomeWelcomeBlock;