import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';
import CategoryService from '../../services/category-service';
import isPostValid from '../../utils/postValidation';
import EditPost from '../../components/Post/EditPost'


class EditPostView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {
      title: null,
      content: null,
      imageUrl: null,
      category: null,
      },
      redirect: false,
      editedPostId: null,
      categories: [],
      errors: {},
      message: ''
    }
    
    this.PostService = new PostService();
    this.CategoryService = new CategoryService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
      const id = this.props.match.params.id;
      try {
        let {categories} = await this.CategoryService.all();
        let {post} = await this.PostService.postDetails(id);

          this.setState({
              post: {
                  title: post.title,
                  content: post.content,
                  imageUrl: post.imageUrl,
                  category: post.category,
                  },
                  categories: categories,
                  message: ''
              })
      } catch (error) {
          console.log(error)
      }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let validatePost = isPostValid(this.state);
    let validateErrors = validatePost.errors;
    let isValid = validatePost.isValid;

    if(!isValid) {
      this.setState({errors: validateErrors})
      return;
    }

    let postData = this.state.post;
    const id = this.props.match.params.id;
    postData.createdBy = this.props.userId;
    if(postData.category === null) {
      postData.category = this.state.post.category || 'info'
    }

    let body = await this.PostService.edit({id, postData});
    if(body.errors) {
      this.setState({message: ''})
      let err = this.state.message;
      let values = Object.values(body.errors)
      values.forEach(error => {
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

        this.setState({
          redirect: true,
          editedPostId: body.data._id
        })
      } 
  }

  handleChange(event) {
    const name = event.target.name;    

    if(this.state.post.hasOwnProperty(name)) {
      const value = event.target.value;

      let post = {...this.state.post};
      post[name] = value;

      this.setState({post});
    }
  }
  
  render() {
    const isAuth = localStorage.hasOwnProperty("ujwt")
    const redirectLink = `/post/details/${this.state.editedPostId}`
    // let {title, content, imageUrl, category} = this.state.post;
    // let cat = this.state.categories.filter(c => c.name === category) || []
    // let withoutCat = this.state.categories.filter(c => c.name !== category) || []

    return (
      <div className="Create">
        {(isAuth && !this.state.redirect) ? (
          <EditPost {...this.state} {...this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        ) : (<Redirect to={redirectLink}/>)}
      </div>
    );
  }
}

export default EditPostView;
