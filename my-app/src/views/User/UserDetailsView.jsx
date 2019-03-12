import React, { Component } from 'react';
import { toast } from 'react-toastify';
import UserService from '../../services/user-service';
import UserDetails from '../../components/UserDetails/UserDetails';

class UserDetailsView extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            userD: {},
            posts: {}
        }
        this.UserService = new UserService();
        this.handleClick = this.handleClick.bind(this);
        //this.handleClickDestroy = this.handleClickDestroy.bind(this);
    }
    async componentWillMount() {
        const id = this.props.match.params.id;

        const result = await this.UserService.userDetails(id);

        if(result.user) {
          console.log(result.user)
          this.setState({
            userD: result.user,
            posts: result.posts
          })
        } 
      }
      
      async handleClick(event) {
        event.preventDefault()
        if(this.props.isAdmin === true) {
          const id = this.props.match.params.id;
          let result = await this.UserService.block(id);
          if(result.user) {
            toast.success(result.message)
            console.log('here')
            console.log(result.user)
            this.setState({
                userD: result.user,
                posts: result.posts,
                })
        }
        return;
        }
    }

    // async handleClickDestroy(event) {
    //   event.preventDefault()
    //   if(this.props.user === this.state.userD.username) {
    //     const id = this.props.match.params.id;

    //     let result =  await this.UserService.destroy(id);
    //     if(result.user) {
    //       toast.success('Your profile is permanently destroyed!!! You must to create new account to log in InDaHood');
    //     } else {
    //       toast.error("It's not your profile!!!")
    //       this.props.logout();
    //     }
    //   }
    // }

    render() {
      return (
        <UserDetails {...this.state} {...this.props} handleClick={this.handleClick} />
      );
    }
}

export default UserDetailsView;
