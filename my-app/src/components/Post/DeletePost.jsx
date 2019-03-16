import React, { Component} from 'react';
import {Link} from 'react-router-dom';

class DeletePost extends Component {
    render() {
      let id = this.props.match.params.id;
      return (
        <div className="col s10 offset-s1">
            <br></br>
            <h4>Delete post:</h4>
            <div className="card white">
                <div className="card-content">
                     <h4 className="orange-text darken-3 ">Are you sure you want to delete post ''{this.props.post.title}''?</h4>
                </div>
                <div className="orange darken-3 ">
                    <h5 className="white-text">Press [DELETE] to proceed!</h5>
                </div>
                <div className="card-action">
                    <Link type="button" to={"/post/details/" + id} className="waves-effect grey darken-3  waves-light btn">CANCEL</Link>
                    <Link to="#" type="button" onClick={this.props.handleClickDelete} className="waves-effect orange darken-3  waves-light btn" >DELETE</Link>
                </div>
            </div>
        </div>    
      );
    }
}

export default DeletePost;
