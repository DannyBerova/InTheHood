import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import AuthService from '../../services/auth-service';
import isUserDataValid from '../../utils/userValidation';
import Login from '../../components/Auth/LoginForm';
import notify from '../../utils/notification';


const HOME = '/';
const CREDENTIALS_ERROR = 'Invalid credentials!';
const OPTIONS_LOGIN = 'login';
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        username: '',
        password: '',
      },
      redirect: false,
      errors: {},
      message: ''
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
  let validateUser = isUserDataValid(this.state, OPTIONS_LOGIN);
  let validateErrors = validateUser.errors;
  let isValid = validateUser.isValid;

  if(!isValid) {
    this.setState({errors: validateErrors})
    return;
  }

  const result = await this.AuthService.login(this.state.userData);

  if(!result.userId) {
    this.setState({message: CREDENTIALS_ERROR})
    notify.error(this.state.message);
  } else if(result.error){
    this.setState({message: result.error})
    notify.error(result.error);
  } else {
    notify.success(result.message);
    this.setState({
      redirect: true,
    });
    this.props.loginUser(result)
  }
}

render() {
  
  return (
    <div >
      {(!this.state.redirect) ? (
          <Login {...this.state} {...this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      ) : (<Redirect to={HOME}/>)}
    </div>
    )
  }
}

export default LoginView;
