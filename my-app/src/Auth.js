import React, {Component} from 'react';
import {Redirect, Route } from 'react-router-dom';
import RegisterView from './views/Auth/RegisterView';
import LoginView from './views/Auth/LoginView';

class Auth extends Component {
    
    render() {
      return <div>
        <Route exact path={`${this.props.match.path}/login`} 
            render={(props) => (this.props.userId !== null ? (<Redirect to='/'/>) : (<LoginView {...props} loginUser={this.props.loginUser}/>))}
        />
        <Route exact path={`${this.props.match.path}/register` } 
            render={(props) => (this.props.userId !== null ? (<Redirect to='/'/>) : (<RegisterView {...props} loginUser={this.props.loginUser}/>))}
        />
      </div>
    }
  }

  export default Auth;