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
            <Fragment>
            <div className="row">
            <div className="col s10 offset-s1">
                <Fragment>
                    <div className='col s4'>
                        <div className="card-panel lighten-5 z-depth-1">
                            <div className="row valign-wrapper">
                                <div className="col s12">
                                    <div className="row">
                                    <div className='col s8 offset-s2'>
                                        <img src={this.props.createdBy.avatar} alt="" className="circle responsive-img small"/>
                                    </div>
                                    </div>
                                    {isAuth ? (
                                        <Fragment>
                                    <div className="col s6">
                                        <Link className="btn-floating waves-effect waves-light teal darken-1" 
                                    to={userLink}>
                                        <i className="material-icons">person</i>
                                        </Link>
                                    </div>
                                    <div className="col s6">
                                        <Link className={"btn-floating  waves-effect waves-light " + starLinkColor }
                                            to='/' onClick={this.props.handleClickStar}>
                                            <i className="material-icons">star</i>
                                        </Link>
                                    </div>
                                    </Fragment>
                                    ) : null}
                                    
                                    <div><h6 className="teal-text">Stars: {stars}</h6></div>
                                    <hr></hr>
                                    <div className="card-content">
                                        <span><h6 className="teal-text">Category: {category}</h6></span>
                                        <h5>{title}</h5>
                                        <p>by {this.props.createdBy.username}</p>
                                        <p>created on: {dateStr}</p>
                                        <hr></hr>
                                    </div>
                                    <div className="card-action ">
                                        {isCreator 
                                        ? (
                                        <span>
                                            <Link className="waves-effect teal darken-1  waves-light btn" to={editLink}><i className="material-icons left">edit</i>Edit</Link>
                                        </span>) 
                                        : null}
                                        {(isAdmin || isCreator) 
                                        ? (
                                        <Fragment>
                                        <span>
                                        <a class="waves-effect teal darken-1  waves-light btn" href="/" data-toggle="modal" data-target="#myModal"><i className="material-icons left">delete</i>DELETE</a>
                                        </span>
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
                                        </Fragment>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {isAuth && this.props.isBlocked === false 
                            ? (<CreateComment {...this.props} handleCreateComment={this.props.handleCreateComment} handleChange={this.props.handleChange} updateState={this.props.updateState}/>) 
                            : (<p>Adding comment is not available</p>)}
                        </div>
                    </div>
                    <div className="col s8">
                        <div className="card-panel lighten-5 z-depth-1">
                            <h6>"{content}"</h6>
                        </div>
                        <div className="card-panel s6 lighten-5 ">
                            <img  src={imageUrl} alt={title} style={{minWidth: 400 + 'px', maxWidth: 100 + '%'}} />  
                        </div>
                    </div>                      
                </Fragment>
            </div>
            </div>
            <div className="row">
                <div className="col s11 offset-s1">
                {isAuth && this.props.isBlocked === false 
                    ? (<Fragment>
                        <div className="col s11 offset-s5" >
                        <h6 className="teal-text left">Comments:</h6>
                        </div>
                        {(this.props.comments.length > 0) 
                            ? (this.props.comments.map((comment, i) => (
                            <CommentCard key={comment._id} comment={comment} user={this.props.user} updateState={this.props.updateState}/>))) 
                            : (<h6>No comments for this post yet!</h6>)}              
                            <br></br>
                            <br></br>
                    </Fragment>) 
                    : (<p>Log in to see comments!</p>)}
                
                </div>
            </div>
        </Fragment>
        )
    }
}
export default PostDetails;
