import React, { Component } from 'react';
//import { NavLink, Link, Switch } from 'react-router-dom';

class PostCard extends Component {
    handleClick(event) {
      event.preventDefault()
      console.log('testing')
    }

    render() {
        // let isAuth = (this.props.userId)
        // let isAdmin = (this.props.isAdmin)
        let {title, content, category, imageUrl, createdOn, _id, stars} = this.props.post;
        var dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
        let shortContent = content + '...';
        if(content.length > 50) {
          shortContent = content.substr(0, 50) + '...'
        }
        
        let detailsLink = `/post/details/${_id}`;
        let classIsAdminSays = category === 'adminSays' ? (`card-panel teal lighten-4 z-depth-1`) : (`card-panel teal lighten-5 z-depth-1`);
       
        return (
          <div className="col s12 ">
            <div className={classIsAdminSays}>
              <div className="row valign-wrapper">
                <div className="col s2">
                  <img src={imageUrl} alt="" className="circle responsive-img"/>
                  <span>
                  <a className="btn-floating waves-effect waves-light teal darken-1" 
                                href='/' onClick={this.handleClick}><i className="material-icons">star</i></a>
                  </span>
                  <span>
                    <p>Stars: {stars.length}</p>
                  </span> 
                </div>
                <div className="col s10">
                  <div className="card-content">
                    <span>
                      <h5 className="teal-text">Category: {category}</h5>
                    </span>
                    <h4>{title}</h4>
                    <span>
                      <p>by {this.props.post.createdBy.username} / created on: {dateStr}</p>
                    </span>
                    <p>{shortContent}</p>
                    <hr></hr>    
                  </div>
                  <div className="card-action ">
                    <span>
                      <a className="waves-effect teal darken-1  waves-light btn" href={detailsLink}><i class="material-icons left">cloud</i>Read more...</a>
                    </span>
                    
                  </div>
                </div>
              </div>
            </div>           
          </div>
        );
      }
}
export default PostCard;
