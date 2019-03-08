import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service'
import CategoryService from '../../services/category-service'

class EditPost extends Component {

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
  if(!this.isPostValid(this.state.post)) {
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

//TODO: put more validation front-end
isPostValid(post) {
  let isValid = true;

  if(!post.title || !post.title.trim()) {
    toast.error("Title is required!");
    isValid = false;
  }
  if(!post.content || !post.content.trim()) {
    toast.error("Content is required!");
    isValid = false;
  }


  return isValid;
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
    let {title, content, imageUrl, category} = this.state.post;
    let cat = this.state.categories.filter(c => c.name === category) || []
    let withoutCat = this.state.categories.filter(c => c.name !== category) || []

    let renderIfAuth = (
      <div className="container">
        <div className="row">
          <div className="col s12">
              <h1>Edit post</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="title">Title</label>
                    <input className="input-field col s12" type="text" onChange={this.handleChange} name="title" id="title" value={title}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <div class="input-field col s12">
                      <label htmlFor="content">Content</label>
                      <textarea className="input-field col s12 white" type="text" onChange={this.handleChange} name="content" id="content" value={content} ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input className="input-field col s12" type="url" onChange={this.handleChange} name="imageUrl" id="imageUrl" value={imageUrl}/>
                  </div>
                </div>
                <div className="row">
                  <label>Categories</label>
                  <select className="browser-default" name="category" onChange={this.handleChange} >
                    <option value={cat} selected>{category}</option>
                    {withoutCat.map(cat => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>))}
                  </select>
                </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input type="submit" className='waves-effect teal darken-1 waves-light btn-large'  value="EDIT POST"/>
                    </div>
                </div>
              </form>
          </div>
        </div>
      </div>
        
    );

    return (
      <div className="Create">
        {(isAuth && !this.state.redirect) ? (renderIfAuth) : (<Redirect to={redirectLink}/>)}
      </div>
    );
  }
}

export default EditPost;
