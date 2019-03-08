import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';
import PostService from '../../services/post-service';
import CategoryService from '../../services/category-service';
//import './Create.css';

class Create extends Component {

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
  if(!this.isPostValid(this.state.post)) {
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
   //await this.props.createPost(body.data)

    this.setState({
      redirect: true,
      createdPostId: body.data._id
    });
    }   
}

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
    const isAuth = localStorage.ujwt !== null
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    let catFiltered = this.state.categories.filter(c => c.name !== 'info');
    if(!isAdmin) {
      catFiltered = catFiltered.filter(c => c.name !== 'adminSays')
    }
    const redirectLink = `/post/details/${this.state.createdPostId}`
    
    let renderIfAuth = (
      <div className="container">
      <div className="row">
     <div className="col s12">
         <h1>Create post</h1>
         <form onSubmit={this.handleSubmit}>
         <div className="row">
            <div className="col s12">
              <label htmlFor="title">Title</label>
              <input className="input-field col s12" type="text" onChange={this.handleChange} name="title" id="title" placeholder="Title here..."/>
            </div>
         </div>
         <div className="row">
            <div className="col s12">
            <div class="input-field col s12">
              <label htmlFor="content">Content</label>
              <textarea className="input-field col s12 white" type="text" onChange={this.handleChange} name="content" id="content" placeholder="Content here..."></textarea>
            </div>
            </div>
         </div>
         <div className="row">
            <div className="col s12">
              <label htmlFor="imageUrl">Image URL</label>
              <input className="input-field col s12" type="url" onChange={this.handleChange} name="imageUrl" id="imageUrl" placeholder="Image URL here..."/>
            </div>
         </div>
         <div className="row">
          <label>Categories</label>
          <select className="browser-default" name="category" onChange={this.handleChange}>
          <option value='info' selected>info</option>
          {catFiltered.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
            
          ))}
          </select>
         </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="submit" className='waves-effect teal darken-1 waves-light btn-large'  value="CREATE POST"/>
            </div>
         </div>
        </form>
     </div>
    </div>
  </div>
    
    );

    return (
      <div className="Create">
      {this.props.filter ? (<Redirect to='/'/>):
        ((isAuth && !this.state.redirect) ? (renderIfAuth) : (<Redirect to={redirectLink}/>))}
      </div>
    );
  }
}

export default Create;
