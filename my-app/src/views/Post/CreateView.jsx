import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';
import CategoryService from '../../services/category-service';
import Create from '../../components/Post/Create';
import isPostValid from '../../utils/postValidation';

class CreateView extends Component {

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
      createdPostId: null,
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

  let data = await this.CategoryService.all()
  if(data.categories) {
    this.setState({
      categories: data.categories
      })
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
  postData.createdBy = this.props.userId;
  if(postData.category === null) {
    postData.category = this.state.post.category || 'info'
  }

  let body = await this.PostService.create(postData);
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
      createdPostId: body.data._id
    });
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
    const isAuth = localStorage.ujwt !== null
    const redirectLink = `/post/details/${this.state.createdPostId}`

    return (
      <div className="Create">
      {(isAuth && !this.state.redirect) ? (
          <Create {...this.state} {...this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
      ) : (<Redirect to={redirectLink}/>)}
      </div>
    );
  }
}

export default CreateView;
