import React, { Component } from 'react';
import { toast } from 'react-toastify';
//import cnst from '../../utils/constants/constants';
import CommentService from '../../services/comment-service';
import isValidComment from '../../utils/commentValidation';

let blank = '';
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
    
      let commentData = this.state.comment.trim();
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
        toast.error(err);
        return;
      } else if(body.error){
        this.setState({message: body.error})
        toast.error(body.error);
      } else {
        toast.success(body.message);
    
        this.props.updateState()
        blank = ''
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
        blank = value;
        this.setState({comment});
      }
    }

  render() {
    return (
        <div className="col s12">
          <form onSubmit={this.handleSubmit}>
            <div class="input-field col s12">
              <label htmlFor="content">Content</label>
              <textarea style={{minHeight: 80 + "px"}} className="input-field col s12 white" type="text" onChange={this.handleChange} name="content" id="content" placeholder="Comment content here...">{blank}</textarea>
              <div className='red-text'>{this.state.errors.content}</div>
            </div>
            <div className="input-field col s12">
              <input type="submit" className='waves-effect teal darken-1 waves-light btn-small'  value="ADD COMMENT"/>
            </div>
          </form>
        </div>
    );
  }
}

export default CreateComment;
