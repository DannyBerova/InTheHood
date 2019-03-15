import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import cnst from '../../utils/constants/constants';
import CreateComment from '../Comments/CreateComment';
import CommentCard from '../Comments/CommentCard';

class PostDetails extends Component {
    render() {
        let isAuth = (this.props.userId)
        let isAdmin = localStorage.getItem(cnst.isAdmin) === "true"
        let isCreator = localStorage.getItem(cnst.username) === this.props.createdBy.username;

        let {title, content, imageUrl, category, createdOn, _id} = this.props.post;
        var dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
        let stars = this.props.starsCount
        let editLink = `/post/edit/${_id}`;
        let userLink = `/user/details/${this.props.createdBy._id}`;

        let starLinkColor = this.props.liked === true ? 'teal' : 'grey'

        return (
        <div className="row">
            <div className="col s10 offset-s1">
                <div className="card-panel lighten-5 z-depth-1">
                    <div className="row">
                        <div className="card-content col s7">
                            <span><h6 className="teal-text">Category: {category}</h6></span>
                            <h5>{title}</h5>
                            <p>created on: {dateStr} by {this.props.createdBy.username} </p>
                            <div className="card-action ">
                                {isCreator 
                                ? (
                                <div className="col s3 offset-s2">
                                    <Link className="waves-effect teal darken-1  waves-light btn" to={editLink}><i className="material-icons left">edit</i>Edit</Link>
                                </div>) 
                                : null}
                                {(isAdmin || isCreator) 
                                ? (
                                <Fragment>
                                <div className="col s3 offset-s2">
                                    <a class="waves-effect teal darken-1  waves-light btn" href="/" data-toggle="modal" data-target="#myModal"><i className="material-icons left">delete</i>DELETE</a>
                                </div>
                                <div class="modal fade orange" style={{width: 60 + '%', maxHeight: 50 + '%', opacity: 5}}  id="myModal" role="dialog">
                                    <div class="modal-dialog">                           
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Are you sure you want to delete ''{title}'' post?</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p>Press [DELETE] to proceed!</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">CANCEL</button>
                                                    <button type="button" onClick={this.props.handleClickDelete} class="btn btn-default orange" data-dismiss="modal">DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </Fragment>) : null}
                            </div>
                        </div>
                        <div className='card-content col s1 offset-s1'>
                            <div><p className="teal-text">Stars: {stars}</p></div>
                            {isAuth ? (
                                <Fragment>
                                    <div className="col s12">
                                        <Link className={"btn-floating  waves-effect waves-light " + starLinkColor}
                                        to='/' onClick={this.props.handleClickStar}>
                                        <i className="material-icons">star</i>
                                        </Link>
                                    </div>
                                    <div className="col s12">
                                        <br></br>
                                    </div>
                                    <div className="col s12">
                                        <Link className="btn-floating waves-effect waves-light teal darken-1" 
                                        to={userLink}>
                                        <i className="material-icons">person</i>
                                        </Link>
                                    </div>
                                </Fragment>
                            ) : null}
                        </div>
                        <div className='card-content col s2'>
                            <img src={this.props.createdBy.avatar} alt="" className="circle responsive-img small"/>
                        </div>
                        <div className='card-content col s12'>
                            <hr></hr>
                            <p className="teal-text">"Content:"</p>
                            <h6>"{content}"</h6>
                        </div>
                    </div>
                </div>
                <div className="card-panel col s10 offset-s1">
                    <img  src={imageUrl} alt={title} style={{minWidth: 400 + 'px', maxWidth: 100 + '%'}} />  
                </div>                  
                <div className="col s12">
                    {isAuth && this.props.isBlocked === false 
                    ? (<CreateComment {...this.props} handleCreateComment={this.props.handleCreateComment} handleChange={this.props.handleChange} updateState={this.props.updateState}/>) 
                    : (<p>Adding comment is not available</p>)}
                </div>
                {isAuth && this.props.isBlocked === false 
                ? (<Fragment>
                    {(this.props.comments.length > 0) 
                    ? (
                    <Fragment>
                        <div className="col s12">
                            <h6 className="teal-text">Comments (newest first):</h6>
                            {this.props.comments.map((comment, i) => (
                            <CommentCard key={comment._id} comment={comment} user={this.props.user} updateState={this.props.updateState}/>))}
                        </div>
                    </Fragment>) 
                    : (<div className="col s12">
                            <h6>No comments for this post yet!</h6>
                        </div>)}  
                   </Fragment>) 
                : (<p>Log in to see comments!</p>)}
            </div>
        </div>
        )
    }
}
export default PostDetails;
