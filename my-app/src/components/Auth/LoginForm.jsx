import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth-service';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        username: null,
        password: null,
        email: null
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
  this.setState({message: ''})

  const result = await this.AuthService.login(this.state.userData);

  if(!result.userId) {
    this.setState({message: 'Invalid credentials!'})
    toast.error(this.state.message);
  } else if(result.error){
    this.setState({message: result.error})
    toast.error(result.error);
  } else {
    toast.success(result.message);
    this.props.loginUser(result)
    this.setState({
      redirect: true,
    });
  }
}

render() {
  const redirectLink = `/`
  let renderLogin = (
    <div className="container">
      <div className="col s12">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12">
              <label className="black-text"  htmlFor="username">Username</label>
              <input className="input-field col s12" type="text" onChange={this.handleChange} name="username" id="username" placeholder="Your username here..."/>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <label className="black-text"  htmlFor="password">Password</label>
              <input className="input-field col s12" type="password" onChange={this.handleChange}  name="password" id="password" placeholder="******"/>
            </div>
        </div>
          <input type="submit" className='waves-effect teal darken-1 waves-light btn-large'  value="LOGIN"/>
          </form>
      </div>
      <div className='col s12'>
              <h5 className='teal-text'>
                <hr></hr>
                <span>  Don't have an account?   </span>
                <span><a class="waves-effect teal darken-1  waves-light btn-small" href="/auth/register"><i class="material-icons left">border_color</i>Sign Up</a></span>
            </h5>
          </div>
    </div>
  )

  return (
    <div >
      {(!this.state.redirect) ? (renderLogin) : (<Redirect to={redirectLink}/>)}
    </div>
    )
  }
}

export default Login;
