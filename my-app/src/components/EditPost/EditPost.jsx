import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';

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
      createdPostId: null,
      categories: [],
      message: ''
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

 async componentDidMount() {
     const id = this.props.match.params.id;
     try {
         let post = await fetch(`http://localhost:5000/post/details/${id}`)
              .then(res => res.json())
              .then(data => data.post)
         let categories = await fetch(`http://localhost:5000/category`)
              .then(res => res.json())
              .then(data => data.categories)

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

handleSubmit(event) {
  event.preventDefault();
  if(!this.isPostValid(this.state.post)) {
    return;
  }

  let postData = this.state.post;
  console.log(postData)
  const id = this.props.match.params.id;
  postData.createdBy = this.props.userId
 
  fetch(`http://localhost:5000/post/edit/${id}`, {
    method: "POST", 
    headers: new Headers({
      'Authorization': `Bearer ${this.props.jwtoken}`,
        "Content-Type": "application/json",
    }),
    body: JSON.stringify(postData), 
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

      this.setState({
        redirect: true,
        createdPostId: body.data._id
      });
      } 
    })
     .catch(er => {
        console.log(er)
        toast.error(er)
      this.setState({message: er.message || er.TypeError})
  })
}

//will put more validation front-end
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
  if(!post.category || !post.category.trim()) {
    toast.error("Category is required!");
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
    const redirectLink = `/post/details/${this.state.createdPostId}`
    let {title, content, imageUrl, category} = this.state.post;
    let cat = this.state.categories.filter(c => c.name === category)
    let withoutCat = this.state.categories.filter(c => c.name !== category)

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
