import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import cnst from '../../utils/constants/constants';
import PostService from '../../services/post-service';
import DeletePost from '../../components/Post/DeletePost';
import notify from '../../utils/notification';


const HOME = '/';
const NOT_ALLOWED = 'You are not allowed for this operation!';

class DeleteView extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            post: {
                title:''
            },
            createdBy: '',
            message: "",
            redirect: false
        }
        this.PostService = new PostService();
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    async componentWillMount() {
        const id = this.props.match.params.id;
        const result = await this.PostService.postDetails(id);

        if(result.post) {
          this.setState({
            post: result.post,
            createdBy: result.createdBy,
            })
          } 
    }

    async handleClickDelete() {
        const id = this.props.match.params.id;
        const creatorId = this.state.post.createdBy._id;

        const body = await this.PostService.remove({id, creatorId });
        if(this.state.post.createdBy._id === this.props.userId || this.props.isAdmin === true) {
            if(body.error){
                this.setState({message: body.error})
                notify.error(body.error);
            } else {
                notify.success(body.message);
                localStorage.setItem(cnst.message, body.message)
                this.setState({
                    redirect: true,
                });
            }
        } else {
            localStorage.setItem(cnst.message, NOT_ALLOWED)
            this.setState({
                redirect: true,
            });
        }
    }

    render() {
        let {redirect} = this.state;

        return (
            (redirect === true || !this.props.jwtoken) ? (
                <Redirect to={HOME}/>
            ) : (
                <DeletePost {...this.state} {...this.props}  handleClickDelete={this.handleClickDelete} />
            )
        )
    }
}

export default DeleteView;
