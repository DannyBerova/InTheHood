import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';
import PostDetails from '../../components/Post/PostDetails';

class PostDetailsView extends Component {
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
        if(this.props.isBlocked === false) {

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
        } else {
            toast.error('You are blocked! You can\'t give stars!')
        }
        
        
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
        let redirectLink = `/user/details/${this.state.createdBy._id}`;

        return (
            <div className="col s10 offset-s1">
                {(!this.state.redirect) ? (
                    <PostDetails {...this.state} {...this.props} handleClickDelete={this.handleClickDelete} handleClickStar={this.handleClickStar}/>
                ) : (<Redirect to={redirectLink}/>)}
            </div>
        )
    }
}
export default PostDetailsView;
