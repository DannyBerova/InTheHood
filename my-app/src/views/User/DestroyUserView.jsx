import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../../services/user-service';
import DestroyUser from '../../components/UserDetails/DestroyUser';
import notify from '../../utils/notification';


const HOME = '/';
const MESSAGE_DESTROY = 'Your profile is permanently destroyed!!! You must to create new account to log in InDaHood';
class DestroyUserView extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            userD: {},
            redirect: false
        }
        this.UserService = new UserService();
        this.handleClickDestroy = this.handleClickDestroy.bind(this);
    }
    async componentWillMount() {
        const id = this.props.match.params.id;
        const result = await this.UserService.userDetails(id);

        if(result.user) {
          this.setState({
            userD: result.user,
            })
          } 
    }

    async handleClickDestroy(event) {
      event.preventDefault()
      if(this.props.user === this.state.userD.username) {
        const id = this.props.match.params.id;

        let result =  await this.UserService.destroy({id, id2: id });
        if(result.user) {
          notify.success(MESSAGE_DESTROY);
          await this.props.logout(event, MESSAGE_DESTROY)
          this.setState({redirect: true})
        } else {
          toast.error("It's not your profile!!!")
        }
      }
      return;
    }

    render() {
        let {redirect} = this.state;
      return (
          (redirect === true || !this.props.jwtoken) ? (
            <Redirect to={HOME}/>
          ) : (
              <DestroyUser {...this.state} {...this.props}  handleClickDestroy={this.handleClickDestroy} />
          )
      )
    }
}

export default DestroyUserView;
