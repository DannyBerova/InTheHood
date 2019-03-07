import React, { Component } from 'react';
//import { NavLink, Link, Switch } from 'react-router-dom';

class AllUsersAdmin extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            users: {},
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        const token = localStorage.hasOwnProperty('ujwt') ? localStorage.getItem('ujwt') : ('');
        console.log(this.props)
        fetch(`http://localhost:5000/user/all`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            })
          })
          .then(res => res.json())
          .then(data => {
            if(data.users) {
          this.setState({
            users: data.users,
            })
          }
       })
     .catch(er => console.log(er.json()));
    }

    handleClick() {
        localStorage.removeItem('message')
    }

    render() {
     

      return (
        <div className="col s10 offset-s1">
        <h4>ALL USERS</h4>
        <hr></hr>
          <table className='highlight '>
        <thead>
          <tr>
              <th>Username</th>
              <th>Full Name</th>
              <th>E-mail</th>
              <th>Posts count</th>
              <th>Is Blocked</th>
              <th>Is Admin</th>
              <th>No name</th>
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
            <td>{user.isBlocked ? 'Active' : 'Blocked'}</td>
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
