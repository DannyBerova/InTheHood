import React, { Component } from 'react';
import PostCard from '../PostCard/PostCard';
//import { NavLink, Link, Switch } from 'react-router-dom';
import UserService from '../../services/user-service';

class UserDetails extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            user: {},
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
            user: result.user,
            posts: result.posts
            })
          } 
    }

    handleClick(event) {
      event.preventDefault()
      console.log('testing')
    }

    render() {
      //utilities or function to be -OR PUT IN STATE
      let block = this.state.user.isBlocked ? 'UNBLOCK' : 'BLOCK';
      let active = this.state.user.isBlocked ? 'BLOCKED' : 'ACTIVE'
      const postsValues = Object.values(this.state.posts);
      postsValues.map(v => {
            v.createdBy = {};
            v.createdBy['username'] = this.state.user.username;
            return v;
        })
      const {username, email, firstName, lastName} = this.state.user;

      return (
        <div className="col s10 offset-s1">
          <div className="col s3">
            <div class="card">
              <div class="card-content">
                <img src={this.state.user.avatar} alt="" className="circle responsive-img small"/>
                <h6 className='teal-text'>Username:</h6>
                <h5>{username}</h5>
                <h6 className='teal-text'>Full name:</h6>
                <h5>{firstName} {lastName}</h5>
                <h6 className='teal-text'>E-mail:</h6>
                <p>{email}</p>
              </div>
              {this.props.isAdmin === true 
              ? (
              <div class="card-action">
                  <a href='/' onClick={this.handleClick} className="teal darken-1 btn-large">{block}</a>
              </div>
              ) : (
              <div class="card-action">
                <a  href='/' onClick={this.handleClick} className="teal darken-1 btn-large">{active}</a>
              </div>
              )}
            </div>
          </div>
          <div className="col s9">
                {postsValues.length > 0 ? (postsValues.map((post, i) => (
                    <PostCard key={post._id} post={post}/>))
                    ) : (<h4>No posts added!</h4>)}
          </div>
        </div>    
      );
    }
}

export default UserDetails;
