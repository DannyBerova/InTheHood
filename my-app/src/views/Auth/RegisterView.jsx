import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth-service';
import Register from '../../components/Auth/RegisterForm';
import isUserDataValid from '../../utils/userValidation';


class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        username: null,
        password: null,
        repeatPass: null,
        email: null,
        firstName: null,
        lastName: null,
        avatar: null
      },
        redirect: false,
        errors: {},
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
        let validateUser = isUserDataValid(this.state, 'register');
        let validateErrors = validateUser.errors;
        let isValid = validateUser.isValid;

        if(!isValid) {
            this.setState({errors: validateErrors})
            return;
        }

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
   
    return (
      <div className="Create">
        {(!this.state.redirect) ? (
            <Register {...this.state} {...this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        ) : (<Redirect to={redirectLink}/>)}
      </div>
    )
  }
}

export default RegisterView;
