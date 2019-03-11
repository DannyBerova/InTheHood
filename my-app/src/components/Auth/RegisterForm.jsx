import React, { Component } from 'react';

class Register extends Component {
  render() {
   
    return (
      <div className="container">
      <div className="row">
        <div className="col s12">
            <h1>Register</h1>
            <form onSubmit={this.props.handleSubmit}>
            <div className="row">
              <div className="col s6">
                <label className="black-text"  htmlFor="username">Username</label>
                <input className="input-field col s12" type="text" onChange={this.props.handleChange} name="username" id="username" placeholder="Your username here..."/>
                <div className='red-text'>{ this.props.errors.username}</div>
              </div>
              <div className="col s6">
                <label className="black-text"  htmlFor="email">E-mail</label>
                <input className="input-field col s12" type="email" onChange={this.props.handleChange} name="email" id="email" placeholder="Your email here..."/>
                <div className='red-text'>{ this.props.errors.email}</div>
              </div>
            </div>
           
            <div className="row">
              <div className="col s6">
                <label className="black-text" htmlFor="firstName">First Name</label>
                <input className="input-field col s12" type="text" onChange={this.props.handleChange} name="firstName" id="firstName" placeholder="Your First Name here..."/>
                <div className='red-text'>{ this.props.errors.firstName}</div>
              </div>
              <div className="col s6">
                <label className="black-text"  htmlFor="lastName">Last Name</label>
                <input className="input-field col s12" type="text" onChange={this.props.handleChange} name="lastName" id="lastName" placeholder="Your Last Name here..."/>
                <div className='red-text'>{ this.props.errors.lastName}</div>
              </div>
            </div>
           
            <div className="row">
              <div className="col s6">
                <label className="black-text"  htmlFor="password">Password</label>
                <input className="input-field col s12" type="password" onChange={this.props.handleChange}  name="password" id="password" placeholder="******"/>
                <div className='red-text'>{ this.props.errors.password}</div>
              </div>
              <div className="col s6">
                <label className="black-text"  htmlFor="password">Repeat Password</label>
                <input className="input-field col s12" type="password" onChange={this.props.handleChange}  name="repeatPass" id="repeatPass" placeholder="******"/>
                <div className='red-text'>{ this.props.errors.repeatPass}</div>
              </div>
          </div>
          <div className="row">
              <div className="col s12">
                <label className="black-text"  htmlFor="avatar">Avatar URL</label>
                <input className="input-field col s12" type="url" onChange={this.props.handleChange} name="avatar" id="avatar" placeholder="Your Avatar URL here..."/>
                <div className='red-text'>{ this.props.errors.avatar}</div>
              </div>
            </div>
            <input type="submit" className='waves-effect teal darken-1 waves-light btn-large'  value="REGISTER"/>
            </form>
        </div>
        <div className='col s12'>
            <h5 className='teal-text'>
              <hr></hr>
              <span>  Already have an account?   </span>
              <span><a class="waves-effect teal darken-1  waves-light btn-small" href="/auth/login"><i class="material-icons left">border_color</i>Log In</a></span>
          </h5>
        </div>
    </div>
  </div>
    )
  }
}

export default Register;
