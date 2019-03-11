import React, { Component } from 'react';

class EditPost extends Component {
  render() {
    let {title, content, imageUrl, category} = this.props.post;
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    let catFiltered = this.props.categories;
    if(!isAdmin) {
      catFiltered = catFiltered.filter(c => c.name !== 'adminSays')
    }
    let cat = catFiltered.filter(c => c.name === category)[0] || []
    let withoutCat = catFiltered.filter(c => c.name !== category) || []

    return (
        <div className="container">
        <div className="row">
          <div className="col s12">
              <h1>Edit post</h1>
              <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="title">Title</label>
                    <input className="input-field col s12" type="text" onChange={this.props.handleChange} name="title" id="title" value={title}/>
                    <div className='red-text'>{ this.props.errors.title}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <div class="input-field col s12">
                      <label htmlFor="content">Content</label>
                      <textarea className="input-field col s12 white" type="text" onChange={this.props.handleChange} name="content" id="content" value={content} ></textarea>
                    </div>
                    <div className='red-text'>{ this.props.errors.content}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input className="input-field col s12" type="url" onChange={this.props.handleChange} name="imageUrl" id="imageUrl" value={imageUrl}/>
                  </div>
                  <div className='red-text'>{ this.props.errors.imageUrl}</div>
                </div>
                <div className="row">
                  <label>Categories</label>
                  <select className="browser-default" name="category" onChange={this.props.handleChange} >
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
  }
}

export default EditPost;
