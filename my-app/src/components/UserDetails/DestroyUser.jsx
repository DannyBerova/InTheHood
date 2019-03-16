import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class DestroyUser extends Component {
    render() {
      let id = this.props.userD._id
       const {username, email, firstName, lastName} = this.props.userD;

      return (
        <div className="col s10 offset-s1">
          <div className="card white">
              <div className="card-content">
                  <h4 className="red-text">Are you sure you want to </h4>
                  <h4 className="red-text">DESTROY YOUR PROFILE and delete ALL YOUR POSTS?</h4>
                  <h4 className="red-text">It's PERMANENT!!!</h4>
                </div>
                <div className="red">
                    <h5 className="white-text">Press [DESTROY!] to proceed!</h5>
                </div>
                <div className="card-action">
                    <Link type="button" to={"/user/details/" + id} className="waves-effect grey darken-3  waves-light btn">CANCEL</Link>
                    <button type="button" onClick={this.props.handleClickDestroy} className="waves-effect red darken-3  waves-light btn" >DESTROY!</button>
                </div>
              </div>
            <div className="card-content s6">
              <div className="col s6  offset-s1">
              <h6 className='teal-text'>Username:</h6>
              <h5>{username}</h5>
              <hr></hr>
              <h6 className='teal-text'>Full name:</h6>
              <h5>{firstName} {lastName}</h5>
              <hr></hr>
              <h6 className='teal-text'>E-mail:</h6>
              <p>{email}</p>
              <Link type="button" to="/" className="waves-effect grey darken-3  waves-light btn-large">GO HOME! NOW!</Link>
              </div>
              <div className="col s3">
                  <img src={this.props.userD.avatar} alt="" className="circle responsive-img small"/>
              </div>
            </div>
        </div>    
      );
    }
}

export default DestroyUser;
