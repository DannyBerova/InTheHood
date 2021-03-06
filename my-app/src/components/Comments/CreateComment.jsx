import React, { Component } from 'react';
import CommentService from '../../services/comment-service';
import isValidComment from '../../utils/commentValidation';
import notify from '../../utils/notification';


class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          comment: {
          content: '',
          postId: '',
          createdBy: '',
          },
          redirect: false,
          createdCommentId: null,
          errors: {},
          message: ''
        }
        
        this.CommentService = new CommentService();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
      this.setState({
        comment: {
          content: '',
          postId: '',
          createdBy: '',
          },
          redirect: false,
          createdCommentId: null,
          errors: {},
          message: ''
      })
    }
    
    async handleSubmit(event) {
      event.preventDefault();
      event.target.children[0].children[1].value = '';
      let validateComment = isValidComment(this.state);
      let validateErrors = validateComment.errors;
      let isValid = validateComment.isValid;
    
      if(!isValid) {
        this.setState({errors: validateErrors})
        return;
      }
    
      let commentData = this.state.comment;
      commentData.createdBy = this.props.user;
      commentData.postId = this.props.match.params.id;
      
      let body = await this.CommentService.create(commentData);
      if(body.errors) {
        this.setState({message: ''})
        let err = this.state.message;
        let values = Object.values(body.errors)
        values.forEach(error => {
            err = err + ' ' + error;
        })
        this.setState({message: err})
        notify.error(err);
        return;
      } else if(body.error){
        this.setState({message: body.error})
        notify.error(body.error);
      } else {
        notify.success(body.message);
    
        this.props.updateState()
        this.setState({
          redirect: true,
          createdCommentId: body.data._id,
          comment: {
          content: '',
          postId: '',
          createdBy: '',
          },
          errors: {},
          message: ''
        });
        }   
    }
    
    handleChange(event) {
      const name = event.target.name;    
    
      if(this.state.comment.hasOwnProperty(name)) {
        const value = event.target.value;
    
        let comment = {...this.state.comment};
        comment[name] = value;
        this.setState({comment});
      }
    }

  render() {
    
    return (
        <div className="col s12">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <label htmlFor="content">Content</label>
              <textarea style={{minHeight: 80 + "px"}} className="input-field col s12 white" type="text" onChange={this.handleChange} name="content" id="content" placeholder="Comment content here..."></textarea>
              <div className='red-text'>{this.state.errors.content}</div>
            <span className="input-field col s12">
              <input type="submit" className='waves-effect teal darken-1 waves-light btn-small'  value="ADD COMMENT"/>
            </span>
            </div>
          </form>
        </div>
    );
  }
}

export default CreateComment;
