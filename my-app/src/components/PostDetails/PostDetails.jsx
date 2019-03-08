import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';

class PostDetails extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            post: {},
            createdBy: {},
            starsCount: 0,
            stars: [],
            redirect: false,
            notAllowed: false,
            liked: false
        }

        this.PostService = new PostService();
        this.handleClickStar = this.handleClickStar.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    async componentWillMount() {
        const id = this.props.match.params.id;

        const result = await this.PostService.postDetails(id);

        if(result.post) {
            this.setState({
                post: result.post,
                createdBy: result.createdBy,
                starsCount: result.starsCount,
                stars: result.stars,
                liked: result.stars.includes(this.props.userId)
                })
        }
    }

    

    async handleClickStar(event) {
        event.preventDefault()
        const id = this.props.match.params.id;
        
            let result = await this.PostService.star(id);
            console.log('hop')
            console.log(result)
            if(result.post) {
                toast.success(result.message)
                this.setState({
                    post: result.post,
                    createdBy: result.createdBy,
                    starsCount: result.starsCount,
                    stars: result.stars,
                    liked: result.stars.includes(this.props.userId)
                    })
            }
            return;
        
    }

    async handleClickDelete() {
        const id = this.state.post._id;
        const creatorId = this.state.post.createdBy._id;
        console.log(creatorId)

        const body = await this.PostService.remove({id, creatorId });


        if(this.state.createdBy._id === this.props.userId || this.props.isAdmin === true) {
            if(body.error){
                this.setState({message: body.error})
                toast.error(body.error);
            } else {
                toast.success(body.message);
                
                localStorage.setItem('message', body.message)
                this.setState({
                    redirect: true,
                });
            }
        } else {
            localStorage.setItem('message', 'You are not allowed for this operation!')
            this.setState({
                redirect: true,
            });
        }
    }
    
    render() {
        let isAuth = (this.props.userId)
        let isAdmin = localStorage.getItem('isAdmin') === "true"
        let isCreator = localStorage.getItem('username') === this.state.createdBy.username;
        let redirectLink = `/user/details/${this.state.createdBy._id}`;

        let toRender = null;
        if(!this.state.redirect) {
            let {title, content, imageUrl, category, createdOn, _id} = this.state.post;
            var dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
            let stars = this.state.starsCount
            let editLink = `/post/edit/${_id}`;
            let userLink = `/user/details/${this.state.createdBy._id}`;

            let starLinkColor = this.state.liked === true ? 'teal' : 'grey'
            
            toRender=(<Fragment>
                <div className='col s5'>
                    <div className="card-panel lighten-5 z-depth-1">
                        <div className="row valign-wrapper">
                            <div className="col s3">
                                <img src={this.state.createdBy.avatar} alt="" className="circle responsive-img small"/>
                                {isAuth ? (<span><a className="btn-floating waves-effect waves-light teal darken-1" 
                                href={userLink}><i className="material-icons">person</i></a></span>) : null}
                                
                                <span>
                                    <a className={"btn-floating  waves-effect waves-light " + starLinkColor }
                                        href='/' onClick={this.handleClickStar}>
                                        <i className="material-icons">star</i>
                                    </a>
                                </span>
                                <span><h5>Stars: {stars}</h5></span>
                            </div>
                            <div className="col s7">
                                <div className="card-content">
                                    <span><h6 className="teal-text">Category: {category}</h6></span>
                                    <h5>{title}</h5>
                                    <p>by {this.state.createdBy.username}</p>
                                    <p>created on: {dateStr}</p>
                                    <hr></hr>
                                </div>
                                <div className="card-action ">
                                    {isCreator 
                                    ? (
                                    <span>
                                        <a className="waves-effect teal darken-1  waves-light btn-large" href={editLink}><i className="material-icons left">edit</i>Edit</a>
                                    </span>) 
                                    : null}
                                    {(isAdmin || isCreator) 
                                    ? (
                                    <Fragment>
                                    <span>
                                    <button type="button" class="waves-effect teal darken-1  waves-light btn-large" data-toggle="modal" data-target="#myModal"><i className="material-icons left">edit</i>DELETE</button>
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
                                                    <button type="button" onClick={this.handleClickDelete} class="btn btn-default orange" data-dismiss="modal">DELETE</button>
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
                        <img  src={imageUrl} alt={title} style={{minWidth: 600 + 'px', maxWidth: 100 + '%'}} />  
                    </div>
                </div>                      
            </Fragment>)
        }

        return (
            <div className="col s10 offset-s1">
                {(!this.state.redirect) ? (toRender) : (<Redirect to={redirectLink}/>)}
            </div>
        )
    }
}
export default PostDetails;
