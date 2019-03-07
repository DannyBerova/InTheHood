import React, { Component } from 'react';

class SideNavRight extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            latestPost: {
              title: '',
              content: '',
              _id: ''
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
      fetch('http://localhost:5000/post/latest')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data) {
            this.setState({
              latestPost: data
            })       
          } else {
            this.setState({
              latestPost: this.props.latestPost || {}
            })
          }
      })
      .catch(er => console.log(er.json())); 
    }

    handleClick() {
        localStorage.removeItem('message')
    }

    render() {
      if(this.state.latestPost.content === undefined) {
        return <h2>No content</h2>
      }
        //let ifAdmin = (this.props.isAdmin) ? (<span><NavLink to="/movies/create" onClick={this.handleClick}>Create</NavLink></span>) : (null)
        
        //utilities - string processing out
        let detailsLink = `/post/details/${this.state.latestPost._id}` || '';
        let shortContent = (this.state.latestPost.content) + '...' || '';
        if(this.state.latestPost.content.length > 100) {
          shortContent = (this.state.latestPost.content.substr(0, 50) + '...') || ''
        }
        return (
          <div className='col s2' >
            <ul >
              <li><h5>*TRENDING*</h5></li> 
              <li><button type="text" class="waves-effect teal   waves-light btn-large" onClick={this.handleClick} value='' >TOP RATED</button></li> 
              <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='info' >LOCATION</button></li> 
              <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='gossip' >WEATHER</button></li>  
              <li>
                <div class="row">
                  <div class="col s12">
                    <div class="card">
                      <div class="card-content">
                        <h5 className='teal-text'>*LATEST*</h5>
                        <h5>{this.state.latestPost.title}</h5>
                            <p>{shortContent}</p>
                      </div>
                      <div class="card-action">
                        <a className="waves-effect teal darken-1  waves-light btn" href={detailsLink}><i class="material-icons left">cloud</i>Read more...</a>
                      </div>
                    </div>
                  </div>
                </div>             
              </li>
            </ul>
          </div>
      );
  }
}
export default SideNavRight;
