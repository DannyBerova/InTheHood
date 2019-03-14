import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentService from '../../services/comment-service'

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
        if(this.props.comment.createdBy === this.props.user || this.props.user === 'Admin') {
            let result = await this.CommentService.remove(commentObj);
            if(result.success === false){
                toast.error(result.message);
            } else {
            toast.success(result.message);
            this.props.updateState()
            }
        } else {
            toast.error("You cannot delete other users comments!")
        }


    }
    render() {
      
        let {_id, content, postId, createdBy, createdOn} = this.props.comment;
        let isCreatorOrAdmin = createdBy === this.props.user || this.props.user === 'Admin';
        console.log(this.props.user)
        let ifEntry =_id && content && postId && createdBy && createdOn;
        let dateStr, classIsAdminSays;
        if(ifEntry) {
          dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
          classIsAdminSays = createdBy === 'Admin' ? (`teal lighten-5`) : (``);
        }
        return (
          (!ifEntry) ? (<h3>No comments for this post yet!</h3>) : (
          <Fragment>
              <div className={"card-panel col s11 "  + classIsAdminSays}>
                    <div className="card-content col s12">
                        <br></br>
                        <p className=" teal-text">on {dateStr} by {createdBy}:  
                            <span className="black-text">
                            " {content}"
                            </span>
                        </p>
                    </div>
                </div>
                <div className="col s1">
                    {isCreatorOrAdmin === true 
                    ? (<span>
                        <Link className="btn-floating btn-small waves-effect waves-light grey"
                        to='/' onClick={this.handleDeleteComment}>
                        <i className="material-icons">delete</i>
                        </Link>
                    </span>) 
                    : (null)}
                </div>
          </Fragment>
        ))
      }
}
export default CommentCard;