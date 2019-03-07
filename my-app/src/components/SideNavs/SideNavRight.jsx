import React, { Component } from 'react';

class SideNavRight extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            posts: this.props.posts,
            newestAdminSays: {
              title: '',
              content: '',
              _id: ''
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps ) {
          let newest = nextProps.posts.sort((a,b) => a.createdOn > b.createdOn)[0]
          console.log(nextProps)
          this.setState({
              newestAdminSays: newest,
              posts: nextProps.posts
          })
      }
     }

    handleClick() {
        localStorage.removeItem('message')
    }

    render() {
        //let ifAdmin = (this.props.isAdmin) ? (<span><NavLink to="/movies/create" onClick={this.handleClick}>Create</NavLink></span>) : (null)
        
        //utilities - string processing out
        let detailsLink = `/post/details/${this.state.newestAdminSays._id}` || '';
        let shortContent = (this.state.newestAdminSays.content) + '...' || '';
        if(this.state.newestAdminSays.content.length > 100) {
          shortContent = (this.state.newestAdminSays.content.substr(0, 50) + '...') || ''
        }
        return (
          <div className='col s2' >
            <ul className='teal darken-1 ' >
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
                        <h5>{this.state.newestAdminSays.title}</h5>
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
