import React, { Component, Fragment } from 'react';

import PostCard from '../Post/PostCard';
import Pagination from "../pagination";
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
        search: '',
        currentPosts: [],
        currentPage: null,
        totalPages: 1
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
          filter: '',
          posts: orderedPosts,
          filteredPosts: orderedPosts,
          currentPosts: orderedPosts,
          totalPages: Math.ceil(orderedPosts / 5)
        })
    }
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
}

async filterPosts(text) {
    this.setState({filteredPosts: this.state.posts, })
    let filtered = this.state.posts.concat();
    let filter = text;
    if(text === 'toprated') {
        filtered = filtered.sort((a, b) => a.stars.length < b.stars.length)
    } else if(text === 'all'){
        filtered = this.state.posts;
        filter = ''
    } else {

     filtered = text !== '' 
                ? (filtered.filter(p => p.category === text) )
                : this.state.posts
    }
    if(filtered.length > 0) {

        let filteredLength = filtered.length > 0 ? filtered.length : 1
        this.setState({ 
            filteredPosts: filtered,
            currentPosts: filtered.slice(0,5),
            totalPages: Math.ceil(filteredLength / 5) || 1,
            currentPage: 1,
            filter: filter
            })
    } else {
        this.setState({
            filteredPosts: [{
            title:'', content: '', imageUrl: '', stars:''
            }],
            currentPosts: [{
                title:'', content: '', imageUrl: '', stars:''
                }],
                totalPages:1,
            filter: filter
    })
    }
    
  }
  search() {
      let filtered = this.state.posts;
      let filter = '';
      if(this.state.search !== '') {
          filtered = this.state.posts.filter(p => p.title.toLowerCase().includes(this.state.search.toLowerCase())) 
          filter = this.state.search;
      } else {
          filtered = this.state.posts
      }
      let filteredLength = filtered.length > 0 ? filtered.length : 1
      if(filtered.length > 0) {

          this.setState({
              filteredPosts: filtered,
              currentPosts: filtered.slice(0,5),
            totalPages: Math.ceil(filteredLength / 5) || 1,
            currentPage: 1,
            search: '',
            filter: filter
          })
      } else {
        this.setState({
            filteredPosts: [{
            title:'', content: '', imageUrl: '', stars:''
            }],
            currentPosts: [{
                title:'', content: '', imageUrl: '', stars:''
                }],
                totalPages:1,
            currentPage: 1,
            search: '',
            filter: filter
    })
    }
  }

onPageChanged = data => {
    console.log(data)
    let {filteredPosts } = this.state;
    //let filtered = this.state.posts;
    const { currentPage, totalPages, pageLimit } = data;
     //let totalRecords = this.state.filteredPosts.length;

    const offset = (currentPage - 1) * pageLimit;
    let currentPosts = filteredPosts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPosts, totalPages });
    console.log(currentPosts)
  };
  

  render() {
    const {
        filteredPosts,
        currentPosts,
        currentPage,
        totalPages
      } = this.state;
      const totalPosts = filteredPosts.length;
  
      if (totalPosts === 0) return null;
  
      const headerClass = [
        "text-dark py-2 pr-4 m-0",
        currentPage ? "border-gray border-right" : ""
      ]
        .join(" ")
        .trim();
    //TODO: pagination, weather, location, top rated
      let isAuth = this.props.isLoggedIn;
      let filterAdded = this.state.filter === '' ? '' : ` * Filtered by: ${this.state.filter}`
      let welcomeBlock = (
          <Fragment>
              <h4>
                <span><a class="waves-effect teal darken-1 waves-light btn-small" href='auth/register'><i class="material-icons left white-text">border_color</i>Register</a></span>
                <span>   Welcome in the hoood...   </span>
                <span><a class="waves-effect teal darken-1  waves-light btn-small" href="/auth/login"><i class="material-icons left">border_color</i>Log In</a></span>
            </h4>
            <h4>Slatina hood! Log in to see all the stuff.</h4>
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
                                    <input className="input-field col s11 " type="text" onChange={this.handleChange} 
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
                            <div className="row ">
                            <div className="row d-flex flex-row py-5">
                            <div className="w-90 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                <p className="teal-text align-items-center">
                                
                                {currentPage && (
                                    
                                    <span>Page {currentPage} / {" "}
                                    {totalPages} {filterAdded} </span>
                                    
                                )}
                                </p>
                                <div className="d-flex flex-row py-4   ">
                                <Pagination
                                    totalRecords={this.state.filteredPosts.length}
                                    totalPages={totalPages}
                                    records={filteredPosts}
                                    pageLimit={5}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}
                                />
                                </div>
                            </div>
                            {(filteredPosts.length > 0
                                ) ? (currentPosts.map(post => (
                                    <PostCard key={post._id} post={post} />
                                  ))
                                ) : (<h4>No posts found!</h4>)}
                        </div>
                        </div>
                        </div>
                    </Fragment>
                <SideNavRight  {...this.state} {...this.props} filterPosts={this.filterPosts}/>
            </div>
        </Fragment>
    );
  }
}
export default HomeGuest;