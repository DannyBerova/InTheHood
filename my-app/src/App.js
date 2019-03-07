
import React, { Component, Fragment, Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.css'
import './App.css';

const HomeGuest = lazy(() => import('./components/Home/HomeGuest'));
const Create = lazy(() => import('./components/Create/Create'));
const Auth = lazy(() => import('./Auth'));
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const PostDetails = lazy(() => import('./components/PostDetails/PostDetails'));
const EditPost = lazy(() => import('./components/EditPost/EditPost'));
const UserDetails = lazy(() => import('./components/UserDetails/UserDetails'));
const AllUsers = lazy(() => import('./components/AllUsersAdmin/AllUsersAdmin'));
const NoMatch = lazy(() => import('./components/NoMatch/NoMatch'));


class App extends Component {
  constructor(props) {
    super(props) 
    this.state={
      isAdmin: localStorage.getItem('isAdmin') === 'true' || false,
      isLoggedIn: false,
      jwtoken: localStorage.getItem('username') || null,
      user: localStorage.getItem('username') || null,
      userId: localStorage.getItem('userId') || null,
      hasFetched: false,
      filter: '',
      posts: [],
      message: ''
    }

    this.fetchPosts = this.fetchPosts.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
    this.createPost = this.createPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.searchByString = this.searchByString.bind(this);
  }

  async componentWillMount() {
    await fetch('http://localhost:5000/post/')
      .then(res => res.json())
      .then(data => {
        if(data.posts) {
          let orderedPosts = data.posts.sort((a, b) =>{
            return a.createdOn < b.createdOn
          })
          localStorage.removeItem('message')
          if(localStorage.getItem('userId')) {
            this.setState({
              user: localStorage.getItem('username'),
              userId: localStorage.getItem('userId'),
              jwtoken: localStorage.getItem('ujwt'),
              isLoggedIn: true,
              isAdmin: localStorage.getItem('isAdmin') === 'true',
              message: '',
              posts: orderedPosts,
              hasFetched: true
            })       
          } else {
            this.setState({
              message: '',
              posts: orderedPosts,
              hasFetched: true
            })
          }
        }
      })
      .catch(er => console.log(er.json())); 
  }

  async fetchPosts(message) {
      fetch('http://localhost:5000/post/')
      .then(res => res.json())
      .then(data => {
          if(data.posts) {
            let orderedPosts = data.posts.sort((a, b) =>{
            return a.createdOn < b.createdOn
            })
            this.setState({
              posts: orderedPosts,
              hasFetched: true,
              filter: '',
              message: message
              })
            }
        })
      .catch(er => console.log(er.json()));
  }

  async loginUser(user) {
    if(user && user.userId) {
      await this.setState((prevState, props) => ({
        user: user.username,
        userId: user.userId,
        isLoggedIn: true,
        isAdmin: user.isAdmin,
        message: user.message,
        jwtoken: user.token
      }));
      localStorage.setItem('isAdmin', user.isAdmin);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('ujwt', user.token);
      //toast.success(<h4>{this.state.message}</h4>);
    }
  }

  logout(event) {
    event.preventDefault();
    this.setState({
      isAdmin: false,
      isLoggedIn: false,
      user: null,
      userId: null,
      isFetched: false,
      message: 'Logged Out!'
    })
    localStorage.clear()
    toast.success('Logged Out!');
  }

  async createPost (post) {
   let currPosts = this.state.posts;
   currPosts.unshift(post)
   localStorage.setItem('message', `Post "${post.title}" created.`);
   this.setState({
     posts: currPosts,
     message: `Post "${post.title}" created.`,
    });
  }
  async deletePost(message, id) {
    localStorage.setItem('message', message)
    this.fetchPosts(message)
  }

  async searchByString(text) {
    this.setState({ filter: '' })
    let filterExists = text
    this.setState({ filter: filterExists })
  }

  render() {
    return (
      <div className="App bgimg ">
        <div className="row " >
            <Suspense fallback={<h1 className='teal'>Loading...</h1>}>
          <BrowserRouter>
              <Fragment>
                <Header  {...this.state} logout={this.logout} />
                <div className='col s12'>
                  <Switch>
                      <Route exact path='/' render={(props) => <HomeGuest 
                              {...props} 
                              {...this.state}  
                              setHomePage={this.setHomePage}
                              searchByString={this.searchByString}/>} />
                      <Route exact path='/:text' render={(props) => <HomeGuest 
                              {...props} 
                              {...this.state}  
                              searchByString={this.searchByString}
                              />} />
                      <Route path='/post/details/:id' render={(props) => <PostDetails 
                              {...props} 
                              {...this.state}  
                              deletePost={this.deletePost}/>} />
                        <Route path='/user/details/:id' render={(props) =>
                        (!localStorage.hasOwnProperty('ujwt')) ? (<Redirect to="/"/>
                        ) : (<UserDetails {...props} {...this.state} createPost={this.createPost}/>)}
                              />
                      <Route path='/auth' 
                            render={(props) => <Auth 
                              {...props} 
                              {...this.state}  
                              loginUser={this.loginUser}/>} />
                      <Route exact path='/post/create' 
                              render={(props) => 
                                (!localStorage.hasOwnProperty('ujwt')) ? (<Redirect to="/"/>
                                ) : (<Create {...props} {...this.state} createPost={this.createPost}/>)}
                          />
                      <Route exact path='/post/edit/:id' 
                              render={(props) => 
                                (!localStorage.hasOwnProperty('ujwt')
                                ) ? (<Redirect to="/"/>
                                ) : (<EditPost {...props} {...this.state}/>)}
                          />
                      <Route exact path='/user/all' 
                              render={(props) => 
                                ((!localStorage.hasOwnProperty('isAdmin') || this.state.isAdmin === false) 
                                ) ? (<Redirect to="/"/>
                                ) : (<AllUsers {...props} {...this.state}/>)}
                          />
                      <Route render={() => <NoMatch/>}/>
                  </Switch>
                </div>
                <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover/>
                <Footer  {...this.state} logout={this.logout} />
              </Fragment>
          </BrowserRouter>
            </Suspense>
        </div>
      </div>
    );
  }
}

export default App;
