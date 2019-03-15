import React, { Component } from 'react';
import UserService from '../../services/user-service';
import Constants from '../../utils/constants/constants';

class AllUsersAdmin extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            users: {},
        }

        this.UserService = new UserService();
        this.handleClick = this.handleClick.bind(this);
    }
    async componentWillMount() {
        const result = await this.UserService.all();

        if(result.users) {
            this.setState({ users: result.users })
        }
    }

    handleClick() {
        localStorage.removeItem(Constants.message)
    }

    render() {
      return (
        <div className="col s10 offset-s1">
        <h4>ALL USERS</h4>
        <hr></hr>
          <table className='highlight centered'>
        <thead>
          <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>E-mail</th>
              <th>Posts count</th>
              <th>Is Blocked</th>
              <th>Is Admin</th>
              <th>Link to profile</th>
          </tr>
        </thead>

        <tbody>
        {(this.state.users.length > 0
        ) ? (this.state.users.map((user) => (
        <tr key={user._id} user={user}>
            <td>{user.username}</td>
            <td>{user.firstName + '' + user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.posts.length}</td>
            <td>{user.isBlocked ? 'Blocked' : 'Active'}</td>
            <td>{user.roles.includes('Admin') ? 'Admin' : 'User'}</td>
            <td><span><a className="btn-floating waves-effect waves-light teal darken-1" 
                                href={`/user/details/${user._id}`}><i className="material-icons">person</i></a></span></td>
        </tr>))
         ) : (<h4>No users to show!</h4>)}
        
        </tbody>
      </table>
        </div>    
      );
    }
}

export default AllUsersAdmin;
