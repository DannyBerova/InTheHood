import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth-service';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        username: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        avatar: null
      },
        redirect: false,
        message: null
    }

    this.AuthService = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
  const name = event.target.name;    

  if(this.state.userData.hasOwnProperty(name)) {
    const value = event.target.value;

    let userData = {...this.state.userData};
    userData[name] = value;

    this.setState({userData});
  }
}

async handleSubmit(event) {
        event.preventDefault();

        const body = await this.AuthService.register(this.state.userData);

        if(body.errors) {
          this.setState({message: ''})
          let err = this.state.message;
          let values = Object.values(body.errors)
          values.forEach(error => {
              err = err + ' ' + error;
          })
            this.setState({message: err})
            toast.error(err);
          } else if(body.error){
            this.setState({message: body.error})
            toast.error(body.error);
        } else {
              toast.success(body.message);
              await this.props.loginUser(body)
              this.setState({ redirect: true });
        } 
  } 

  render() {
    const redirectLink = `/`
    let renderRegister = (
      <div className="container">
        <div className="row">
          <div className="col s12">
              <h1>Register</h1>
              <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col s6">
                  <label className="black-text"  htmlFor="username">Username</label>
                  <input className="input-field col s12" type="text" onChange={this.handleChange} name="username" id="username" placeholder="Your username here..."/>
                </div>
                <div className="col s6">
                  <label className="black-text"  htmlFor="email">E-mail</label>
                  <input className="input-field col s12" type="email" onChange={this.handleChange} name="email" id="email" placeholder="Your email here..."/>
                </div>
              </div>
             
              <div className="row">
                <div className="col s6">
                  <label className="black-text" htmlFor="firstName">First Name</label>
                  <input className="input-field col s12" type="text" onChange={this.handleChange} name="firstName" id="firstName" placeholder="Your First Name here..."/>
                </div>
                <div className="col s6">
                  <label className="black-text"  htmlFor="lastName">Last Name</label>
                  <input className="input-field col s12" type="text" onChange={this.handleChange} name="lastName" id="lastName" placeholder="Your Last Name here..."/>
                </div>
              </div>
             
              <div className="row">
                <div className="col s12">
                  <label className="black-text"  htmlFor="password">Password</label>
                  <input className="input-field col s12" type="password" onChange={this.handleChange}  name="password" id="password" placeholder="******"/>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                  <label className="black-text"  htmlFor="avatar">Avatar URL</label>
                  <input className="input-field col s12" type="url" onChange={this.handleChange} name="avatar" id="avatar" placeholder="Your Avatar URL here..."/>
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
    return (
      <div className="Create">
        {(!this.state.redirect) ? (renderRegister) : (<Redirect to={redirectLink}/>)}
      </div>
    )
  }
}

export default Register;
