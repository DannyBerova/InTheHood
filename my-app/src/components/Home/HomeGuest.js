import React, { Component, Fragment } from 'react';
import PostCard from '../PostCard/PostCard';
import SideNavLeft from '../SideNavs/SideNavLeft';
import SideNavRight from '../SideNavs/SideNavRight';
import PostService from '../../services/post-service'

class HomeGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts: [],
        filter: '',
        filteredPosts: [],
        search: ''
    }

    this.PostService = new PostService();
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.filterPosts = this.filterPosts.bind(this);
}

async componentWillMount() {
    let data = await this.PostService.all();

    if(data.posts) {
      let orderedPosts = data.posts.sort((a, b) =>{
        return a.createdOn < b.createdOn
      })
      if(this.state.filter !== '') 
     
      localStorage.removeItem('message')
      
        this.setState({
          message: '',
          posts: orderedPosts,
          filteredPosts: orderedPosts,
          hasFetched: true
        })
    }
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}

async filterPosts(text) {
    this.setState({filteredPosts: this.state.posts})
    let filtered = this.state.posts.concat();
    if(text === 'toprated') {
        filtered = filtered.sort((a, b) => a.stars.length < b.stars.length)

    } else {

     filtered = text !== '' 
                ? this.state.posts.filter(p => p.category === text) 
                : this.state.posts
    }

    this.setState({ filteredPosts: filtered })
   
  }

  

search() {
    let filtered = this.state.posts;
    if(this.state.search !== '') {
        filtered = this.state.posts.filter(p => p.title.toLowerCase().includes(this.state.search.toLowerCase())) 
    } else {
        filtered = this.state.posts
    }
    this.setState({
        filteredPosts: filtered,
        search: ''
    })
}
  render() {
    //TODO: pagination, weather, location, top rated
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
                <SideNavLeft  {...this.state} filterPosts={this.filterPosts} />

                    <Fragment>
                        <div className='col s8'>
                            <div className="row">
                                <div className="col s8 offset-s1">
                                    <i class="material-icons left">search</i>
                                    <input className="input-field col s10 " type="text" onChange={this.handleChange} 
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                      this.search()
                                    }
                                  }}   name="search" placeholder="Search..." value={this.state.search}/>
                                </div>
                                <div className="col s2">
                                    <button type="button" id = "btnSearch" className="waves-effect teal darken-1  waves-light btn" onClick={this.search} value='info' >SEARCH</button>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col s11 offset-s1">
                                <ul class="pagination teal">
                                    <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
                                    <li className="active"><a className='teal' href="#!">1</a></li>
                                    <li class="waves-effect"><a href="#!">2</a></li>
                                    <li class="waves-effect"><a href="#!">3</a></li>
                                    <li class="waves-effect"><a href="#!">4</a></li>
                                    <li class="waves-effect"><a href="#!">5</a></li>
                                    <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
                                </ul>
                            </div>
                            </div>
                            {(this.state.filteredPosts.length > 0
                                ) ? (this.state.filteredPosts.map((post) => (
                                    <PostCard key={post._id} post={post}/>))
                                ) : (<h4>No posts to show!</h4>)}
                        </div>
                    </Fragment>
                <SideNavRight  {...this.state} {...this.props} filterPosts={this.filterPosts}/>
            </div>
        </Fragment>
    );
  }
}
export default HomeGuest;