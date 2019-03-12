import React, { Component } from 'react';

class PostCard extends Component {
    render() {
      
        let {title, content, category, imageUrl, createdOn, _id, stars} = this.props.post;
        let ifEntry = title && content && category && imageUrl && createdOn && _id && stars;
        let dateStr, shortContent, detailsLink, classIsAdminSays;
        if(ifEntry) {
          dateStr = new Date(createdOn).toLocaleString('en-GB', { timeZone: 'UTC' });
          shortContent = content + '...';
          if(content.length > 70) {
            shortContent = content.substr(0, 70) + '...'
          }
          
          detailsLink = `/post/details/${_id}`;
          classIsAdminSays = category === 'adminSays' ? (`card-panel teal lighten-4 z-depth-1`) : (`card-panel teal lighten-5 z-depth-1`);
         
        }
        return (
          (!ifEntry) ? (<h3>No posts found!</h3>) : (
          <div className="col s12 ">
            <div className={classIsAdminSays}>
              <div className="row valign-wrapper">
                <div className="col s2">
                  <img src={imageUrl} alt="" className="circle responsive-img" style={{maxHeight: 160 + 'px'}}/>
                  <br></br>
                  <br></br>
                  <span>
                    <p className="teal-text">Stars: {stars.length}</p>
                  </span> 
                </div>
                <div className="col s10">
                  <div className="card-content">
                    <span>
                      <h6 className="teal-text">Category: {category}</h6>
                    </span>
                    <h5>"{title}"</h5>
                    <span>
                      <p className='teal-text'>by {this.props.post.createdBy.username} / created on: {dateStr}</p>
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
        ))
      }
}
export default PostCard;
