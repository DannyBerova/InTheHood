import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="col s12">
            <h1>Login</h1>
            <form onSubmit={this.props.handleSubmit}>
            <div className="row">
              <div className="col s12">
                <label className="black-text"  htmlFor="username">Username</label>
                <input className="input-field col s12" type="text" onChange={this.props.handleChange} name="username" id="username" placeholder="Your username here..."/>
              </div>
              <div className='red-text'>{ this.props.errors.username}</div>
            </div>
            <div className="row">
              <div className="col s12">
                <label className="black-text"  htmlFor="password">Password</label>
                <input className="input-field col s12" type="password" onChange={this.props.handleChange}  name="password" id="password" placeholder="******"/>
              </div>
              <div className='red-text'>{ this.props.errors.password}</div>
          </div>
            <input type="submit" className='waves-effect teal darken-1 waves-light btn-large'  value="LOGIN"/>
            </form>
        </div>
        <div className='col s12'>
                <h5 className='teal-text'>
                  <hr></hr>
                  <span>  Don't have an account?   </span>
                  <span><Link className="waves-effect teal darken-1  waves-light btn-small" to="/auth/register"><i class="material-icons left">border_color</i>Sign Up</Link></span>
              </h5>
            </div>
      </div>
    )
  }
}

export default Login;
