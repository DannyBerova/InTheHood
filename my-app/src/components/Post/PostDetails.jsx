import React, { Component, Fragment } from 'react';

class PostDetails extends Component {
    render() {
        let isAuth = (this.props.userId)
        let isAdmin = localStorage.getItem('isAdmin') === "true"
        let isCreator = localStorage.getItem('username') === this.props.createdBy.username;
        let {title, content, imageUrl, category, createdOn, _id} = this.props.post;
        var dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
        let stars = this.props.starsCount
        let editLink = `/post/edit/${_id}`;
        let userLink = `/user/details/${this.props.createdBy._id}`;

        let starLinkColor = this.props.liked === true ? 'teal' : 'grey'

        return (
            <div className="col s10 offset-s1">
                <Fragment>
                    <div className='col s5'>
                        <div className="card-panel lighten-5 z-depth-1">
                            <div className="row valign-wrapper">
                                <div className="col s3">
                                    <img src={this.props.createdBy.avatar} alt="" className="circle responsive-img small"/>
                                    {isAuth ? (
                                        <Fragment>
                                    <span>
                                        <a className="btn-floating waves-effect waves-light teal darken-1" 
                                    href={userLink}>
                                        <i className="material-icons">person</i>
                                        </a>
                                    </span>
                                    <span>
                                        <a className={"btn-floating  waves-effect waves-light " + starLinkColor }
                                            href='/' onClick={this.props.handleClickStar}>
                                            <i className="material-icons">star</i>
                                        </a>
                                    </span>
                                    </Fragment>
                                    ) : null}
                                    
                                    <span><h6 className="teal-text">Stars: {stars}</h6></span>
                                </div>
                                <div className="col s7">
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
                                            <a className="waves-effect teal darken-1  waves-light btn" href={editLink}><i className="material-icons left">edit</i>Edit</a>
                                        </span>) 
                                        : null}
                                        {(isAdmin || isCreator) 
                                        ? (
                                        <Fragment>
                                        <span>
                                        <button type="button" class="waves-effect teal darken-1  waves-light btn" data-toggle="modal" data-target="#myModal"><i className="material-icons left">edit</i>DELETE</button>
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
                        <div className="card-panel lighten-5 z-depth-1">
                            <p>{content}</p>
                        </div>
                    </div>
                    <div className="col s7">
                        <div className="card-panel s6 lighten-5 ">
                            <img  src={imageUrl} alt={title} style={{ maxWidth: 100 + '%'}} />  
                        </div>
                    </div>                      
                </Fragment>
            </div>
        )
    }
}
export default PostDetails;
