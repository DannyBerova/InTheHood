import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';
import CommentService from '../../services/comment-service';
import PostDetails from '../../components/Post/PostDetails';


const BLOCKED_ERROR = 'You are blocked! You can\'t give stars!';
class PostDetailsView extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            post: {},
            createdBy: {},
            starsCount: 0,
            stars: [],
            comments: [],
            redirect: false,
            notAllowed: false,
            liked: false 
        }

        this.PostService = new PostService();
        this.CommentService = new CommentService();
        this.handleClickStar = this.handleClickStar.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    async componentWillMount() {
        const id = this.props.match.params.id;
        const result = await this.PostService.postDetails(id);

        if(result.post) {
            result.comments.sort((a, b) =>{
                return a.createdOn > b.createdOn  ? -1 : 1;
              })
            this.setState({
                post: result.post,
                createdBy: result.createdBy,
                starsCount: result.starsCount,
                stars: result.stars,
                comments: result.comments,
                liked: result.stars.includes(this.props.userId)
                })
        }
    }

    async handleClickStar(event) {
        event.preventDefault()
        const id = this.props.match.params.id;
        if(this.props.isBlocked === false) {

            let result = await this.PostService.star(id);
            if(result.post) {
                toast.success(result.message)
                result.comments.sort((a, b) =>{
                    return a.createdOn > b.createdOn  ? -1 : 1;
                  })
                this.setState({
                    post: result.post,
                    createdBy: result.createdBy,
                    starsCount: result.starsCount,
                    stars: result.stars,
                    comments: result.comments,
                    liked: result.stars.includes(this.props.userId)
                    })
            }
            return;
        } else {
            toast.error(BLOCKED_ERROR)
        }
    }

    async updateState() {
        const id = this.props.match.params.id;
        let result = await this.CommentService.allByPost(id);
        if(result.comments) {

            result.comments.sort((a, b) =>{
            return a.createdOn > b.createdOn  ? -1 : 1;
          })
        this.setState({
            commentAdded: true,
            comments: result.comments
            })
        }
    }
    
    render() {
        let redirectLink = `/user/details/${this.state.createdBy._id}`;
        return (
            <div className="col s10 offset-s1">
                {(!this.state.redirect) ? (
                    <PostDetails {...this.state} {...this.props}  handleClickStar={this.handleClickStar} updateState={this.updateState}/>
                ) : (<Redirect to={redirectLink}/>)}
            </div>
        )
    }
}
export default PostDetailsView;
