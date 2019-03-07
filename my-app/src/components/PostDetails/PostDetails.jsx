import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

class PostDetails extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            post: {},
            createdBy: {},
            starsCount: 0,
            redirect: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        fetch(`http://localhost:5000/post/details/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.post) {
                console.log(data)
          this.setState({
            post: data.post,
            createdBy: data.createdBy,
            starsCount: data.starsCount
            })
          }
       })
     .catch(er => console.log(er.json()));
    }

    handleClick(event) {
        event.preventDefault()
        console.log('testing')
      }

    handleClickDelete() {
        //let postData = this.state.post;
        const id = this.state.post._id;
        
        fetch(`http://localhost:5000/post/remove/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: new Headers({
                'Authorization': `Bearer ${this.props.jwtoken}`,
                'Content-Type': 'application/json',
            })
            //body: JSON.stringify(postData), 
        })
        .then(res => res.json())
        .then(async (body) => {
            if(body.errors) {
                let err = this.state.message;
                let values = Object.values(body.errors)
                values.forEach(error => {
                    console.log(error)
                    err = err + ' ' + error;
                })
                this.setState({message: err})
                toast.error(err);
                return;
            } else if(body.error){
                this.setState({message: body.error})
                toast.error(body.error);
            } else {
                toast.success(body.message);
                
                this.props.deletePost(body.message, this.state.post)
                localStorage.setItem('message', body.message)
                this.setState({
                    redirect: true,
                    //createdPostId: body.data._id
                });
            } 
        })
        .catch(er => {
            console.log(er)
            toast.error(er)
            this.setState({message: er.message || er.TypeError})
        })
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
            
            toRender=(<Fragment>
                <div className='col s5'>
                    <div className="card-panel lighten-5 z-depth-1">
                        <div className="row valign-wrapper">
                            <div className="col s3">
                                <img src={this.state.createdBy.avatar} alt="" className="circle responsive-img small"/>
                                {isAuth ? (<span><a className="btn-floating waves-effect waves-light teal darken-1" 
                                href={userLink}><i className="material-icons">person</i></a></span>) : null}
                                <span><a className="btn-floating waves-effect waves-light teal darken-1" 
                                href='/' onClick={this.handleClick}><i className="material-icons">star</i></a></span>
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
