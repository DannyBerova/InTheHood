import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import UserService from '../../services/user-service';
import UserDetails from '../../components/UserDetails/UserDetails';
import notify from '../../utils/notification';


class UserDetailsView extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            userD: {},
            posts: {}
        }
        this.UserService = new UserService();
        this.handleClick = this.handleClick.bind(this);
    }
    async componentWillMount() {
        const id = this.props.match.params.id;
        const result = await this.UserService.userDetails(id);
        if(result.user) {
          result.posts.sort((a, b) =>{
            return a.createdOn > b.createdOn  ? -1 : 1;
          })
          this.setState({
            userD: result.user,
            posts: result.posts
          })
        } 
      }
      async componentWillUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
          const id = prevProps.match.params.id;
          const result = await this.UserService.userDetails(id);
          if(result.user) {
            result.posts.sort((a, b) =>{
              return a.createdOn > b.createdOn  ? -1 : 1;
            })
            this.setState({
              userD: result.user,
              posts: result.posts
            })
          } 
        }
      }
      
      async handleClick(event) {
        event.preventDefault()
        if(this.props.isAdmin === true) {
          const id = this.props.match.params.id;
          let result = await this.UserService.block(id);
          if(result.user) {
            result.posts.sort((a, b) =>{
              return a.createdOn > b.createdOn  ? -1 : 1;
            })
            //toast.success(result.message.toString())
            notify.success(result.message)
            this.setState({
                userD: result.user,
                posts: result.posts,
                })
        }
        return;
        }
    }

    render() {
      let isAuth = this.props.isLoggedIn;
      return (
        (isAuth) 
        ? (<UserDetails {...this.state} {...this.props} handleClick={this.handleClick} />) 
        : (<Redirect to="/"/>)
      );
    }
}

export default UserDetailsView;
