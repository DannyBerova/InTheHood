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
    }
    async componentWillMount() {
        const id = this.props.match.params.id;

        const result = await this.UserService.userDetails(id);

        if(result.user) {
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
        console.log('hop')
        console.log(result)
        if(result.user) {
            toast.success(result.message)
            this.setState({
                userD: result.user,
                posts: result.posts,
                })
        }
        return;
        }
    }

    render() {
      return (
        <UserDetails {...this.state} {...this.props} handleClick={this.handleClick} />
      );
    }
}

export default UserDetailsView;
