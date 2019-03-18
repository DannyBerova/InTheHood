import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import CommentService from '../../services/comment-service'
import notify from '../../utils/notification';


class CommentCard extends Component {
    constructor(props) {
        super(props)

        this.CommentService = new CommentService();
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    async handleDeleteComment(event) {
        event.preventDefault();
        let commentObj = {
            id: this.props.comment._id,
            creator: this.props.comment.createdBy
        }
        if(this.props.comment.createdBy === this.props.user || this.props.isAdmin === true) {
            let result = await this.CommentService.remove(commentObj);
            if(result.success === false){
                notify.error(result.message);
            } else {
                notify.success(result.message);
                this.props.updateState()
            }
        } else {
            notify.error("You cannot delete other users comments!")
        }


    }
    render() {
      
        let {_id, content, postId, createdBy, createdOn} = this.props.comment;
        let isCreatorOrAdmin = createdBy === this.props.user || this.props.user === 'Admin';
        let ifEntry =_id && content && postId && createdBy && createdOn;
        let dateStr, classIsAdminSays;
        if(ifEntry) {
          dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
          classIsAdminSays = createdBy === 'Admin' ? (`teal lighten-5`) : (``);
        }
        return (
          (!ifEntry) ? (<h3>No comments for this post yet!</h3>) : (
          <Fragment>
              <div className={"card-panel col s12 "  + classIsAdminSays}>
                    <div className="card-content col s10 offset-s1 left-text">
                        <br></br>
                        <p className=" teal-text">on {dateStr} by {createdBy}:   
                            <span className="black-text">
                             " {content} "
                            </span>
                        </p>
                    </div>
                    {isCreatorOrAdmin === true 
                    ? (<div className="card-content col s1">
                        <Link className="btn-floating btn-small waves-effect waves-light grey"
                        to='/' onClick={this.handleDeleteComment}>
                        <i className="material-icons">delete</i>
                        </Link>
                      </div>) 
                    : (null)}
                </div>
          </Fragment>
        ))
      }
}
export default CommentCard;
