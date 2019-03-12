import React, { Component, Fragment } from 'react';
import PostCard from '../Post/PostCard';

class UserDetails extends Component {
    render() {
      //utilities or function to be -OR PUT IN STATE
      let block = this.props.userD.isBlocked === true ? 'UNBLOCK' : 'BLOCK';
      let active = this.props.userD.isBlocked === true ? 'BLOCKED' : 'ACTIVE';
      let isBlockedColor = this.props.userD.isBlocked === true ? 'grey' : 'teal'
      const postsValues = Object.values(this.props.posts);
      console.log(postsValues) 
      if(postsValues.length > 0 ) {

        postsValues.map(v => {
          v.createdBy = {};
          v.createdBy['username'] = this.props.userD.username;
          return v;
        })
      }
      console.log('render',this.props.userD.username)
      const {username, email, firstName, lastName} = this.props.userD;

      return (
        <div className="col s10 offset-s1">
          <div className="col s3">
            <div class="card">
              {this.props.user === this.props.userD.username 
              ? (
          //      <div class="card-action">
          //      <a href='/' onClick={this.props.handleClickDelete} className="red darken-1 btn-small">Destroy!</a>
          //  </div>
          <Fragment>
          <a type="button" class="waves-effect red darken-3  waves-light btn" href={`/user/destroy/${this.props.userD._id}`}><i className="material-icons left">close</i>DESTROY!</a>
                                       
                                        </Fragment>
              ) : (null)}
              <div class="card-content">
                <img src={this.props.userD.avatar} alt="" className="circle responsive-img small"/>
                <h6 className='teal-text'>Username:</h6>
                <h5>{username}</h5>
                <hr></hr>
                <h6 className='teal-text'>Full name:</h6>
                <h5>{firstName} {lastName}</h5>
                <hr></hr>
                <h6 className='teal-text'>E-mail:</h6>
                <p>{email}</p>
              </div>
              
              {this.props.isAdmin === true 
              ? (
              <div class="card-action">
                  <a href='/' onClick={this.props.handleClick} className={isBlockedColor + " darken-1 btn-large"}>{block}</a>
              </div>
              ) : (
              <div class="card-action">
                <a  href='/' onClick={this.props.handleClick} className={isBlockedColor + " darken-1 btn-large"}>{active}</a>
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
