import React, { Component } from 'react';
import PostCard from '../PostCard/PostCard';
//import { NavLink, Link, Switch } from 'react-router-dom';

class PostDetails extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            user: {},
            posts: {}
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        const token = localStorage.hasOwnProperty('ujwt') ? localStorage.getItem('ujwt') : ('');
        console.log(this.props)
        fetch(`http://localhost:5000/user/details/${id}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            })
          })
          .then(res => res.json())
          .then(data => {
            if(data.user) {
          this.setState({
            user: data.user,
            posts: data.posts
            })
          }
       })
     .catch(er => console.log(er.json()));
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

export default PostDetails;
