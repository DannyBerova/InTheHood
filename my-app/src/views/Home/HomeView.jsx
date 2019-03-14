import React, { Component, Fragment } from 'react';

import Search from '../../components/Home/Search';
import SideNavLeft from '../../components/SideNavs/SideNavLeft';
import Home from '../../components/Home/Home';
import HomeWelcomeBlock from '../../components/Home/homeWelcomeBlock';
import SideNavRight from '../../components/SideNavs/SideNavRight';

import PostService from '../../services/post-service'
import cnst from '../../utils/constants/constants';

const TOP_RATED = 'toprated';
const ALL = 'all';
class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts: [],
        filter: '',
        filteredPosts: [],
        search: '',
        currentPosts: [],
        latest: {},
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
     
      localStorage.removeItem(cnst.message)
      
        this.setState({
          message: '',
          filter: '',
          posts: orderedPosts,
          filteredPosts: orderedPosts,
          currentPosts: orderedPosts,
          latest: orderedPosts[0],
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
    if(text === TOP_RATED) {
        filtered = filtered.sort((a, b) => a.stars.length < b.stars.length)
    } else if(text === ALL){
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
            filteredPosts: [{ title:'', content: '', imageUrl: '', stars:'' }],
            currentPosts: [{ title:'', content: '', imageUrl: '', stars:'' }],
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
            filteredPosts: [{ title:'', content: '', imageUrl: '', stars:'' }],
            currentPosts: [{ title:'', content: '', imageUrl: '', stars:'' }],
            totalPages:1,
            currentPage: 1,
            search: '',
            filter: filter
    })
    }
  }

onPageChanged = data => {
    let {filteredPosts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    let currentPosts = filteredPosts.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentPosts, totalPages });
  };
  

  render() {
    
    return (
        <Fragment>
            <div className='row'>
                <HomeWelcomeBlock  {...this.props} />
                <SideNavLeft  {...this.state} filterPosts={this.filterPosts} />
                    <div className='col s8'>
                        <Search {...this.state} searching={this.search} handleChange={this.handleChange}/>
                        <Home {...this.props} {...this.state} handleChange={this.handleChange} filterPosts={this.filterPosts} onPageChanged={this.onPageChanged}/>
                    </div>
                <SideNavRight  {...this.state} {...this.props} filterPosts={this.filterPosts}/>
            </div>
        </Fragment>
    );
  }
}
export default HomeView;