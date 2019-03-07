import React, { Component, Fragment } from 'react';
import PostCard from '../PostCard/PostCard';
import SideNavLeft from '../SideNavs/SideNavLeft';
import SideNavRight from '../SideNavs/SideNavRight';

class HomeGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts: this.props.posts,
        filter: this.props.filter,
        filteredPosts: this.props.posts,
        search: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
}

componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
        let filtered = nextProps.filter !== '' 
            ? nextProps.posts.filter(p => p.category === nextProps.filter) 
            : nextProps.posts
        this.setState({
            filter: nextProps.filter,
            filtered: filtered,
            posts: filtered
        })
    }
   }
handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}

search() {
    let filtered = this.props.posts;
    if(this.state.search !== '') {
        filtered = this.props.posts.filter(p => p.title.toLowerCase().includes(this.state.search.toLowerCase())) 
    }
    this.setState({
        posts: filtered,
        search: ''
    })
}
  render() {
    console.log("POST render:", this.state.posts)
      let isAuth = this.props.isLoggedIn;
      let welcomeBlock = (
          <Fragment>
              <h4>
                <span><a class="waves-effect teal darken-1 waves-light btn-small" href='auth/register'><i class="material-icons left white-text">border_color</i>Register</a></span>
                <span>   Welcome in the hoood...   </span>
                <span><a class="waves-effect teal darken-1  waves-light btn-small" href="/auth/login"><i class="material-icons left">border_color</i>Log In</a></span>
            </h4>
            <h4>Slatina hood!</h4>
            <h4>Log in to see all the stuff.</h4>
          </Fragment>
      )
      let authBlock = (
        <Fragment>
            <h5 className='teal-text'>Welcome in the hoood... Slatina hood! Get the news!</h5>
        </Fragment>
    )
    return (
        <Fragment>
          <div className='row'>
            {isAuth ? authBlock : welcomeBlock}
                <SideNavLeft  {...this.state} searchByString={this.props.searchByString} />

                    <Fragment>
                        <div className='col s8'>
                            <div className="row">
                                <div className="col s8 offset-s1">
                                    <i class="material-icons left">search</i>
                                    <input className="input-field col s10 " type="text" onChange={this.handleChange} name="search" id="search" placeholder="Search..." value={this.state.search}/>
                                </div>
                                <div className="col s2">
                                    <button type="button" class="waves-effect teal darken-1  waves-light btn" onClick={this.search} value='info' >SEARCH</button>
                                </div>
                            </div>
                            {(this.state.posts.length > 0
                                ) ? (this.state.posts.map((post) => (
                                    <PostCard key={post._id} post={post}/>))
                                ) : (<h4>No posts to show!</h4>)}
                        </div>
                    </Fragment>
                <SideNavRight  {...this.state} {...this.props} logout={this.logout} />
            </div>
        </Fragment>
    );
  }
}
export default HomeGuest;