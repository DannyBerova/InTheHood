
import React, { Component, Fragment, Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.css'
import './App.css';
import PostService from './services/post-service'

const Home = lazy(() => import('./views/Home/HomeView'));
const About = lazy(() => import('./components/About/About'));
const Create = lazy(() => import('./views/Post/CreateView'));
const Auth = lazy(() => import('./Auth'));
const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const PostDetails = lazy(() => import('./views/Post/PostDetailsView'));
const EditPost = lazy(() => import('./views/Post/EditPostView'));
const UserDetails = lazy(() => import('./views/User/UserDetailsView'));
const AllUsers = lazy(() => import('./views/Admin/AllUsersAdmin'));
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
      isBlocked: localStorage.getItem('isBlocked') === 'true' || false,
      message: ''
    }

    this.PostService = new PostService();
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentWillMount() {
      localStorage.removeItem('message')
      if(localStorage.getItem('userId')) {
        this.setState({
          user: localStorage.getItem('username'),
          userId: localStorage.getItem('userId'),
          jwtoken: localStorage.getItem('ujwt'),
          isLoggedIn: true,
          isAdmin: localStorage.getItem('isAdmin') === 'true',
          isBlocked: localStorage.getItem('isBlocked') === 'true',
          message: '',

        })       
      } else {
        this.setState({ message: '' })
      }
  }

   loginUser(user) {
    if(user && user.userId) {
      console.log(user)
       this.setState((prevState, props) => ({
        user: user.username,
        userId: user.userId,
        isLoggedIn: true,
        isAdmin: user.isAdmin,
        isBlocked: user.isBlocked,
        message: user.message,
        jwtoken: user.token
      }));
      localStorage.setItem('isAdmin', user.isAdmin);
      localStorage.setItem('isBlocked', user.isBlocked);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('ujwt', user.token);
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

  render() {
    return (
      <div className="App bgimg ">
        <div className="row" >
            <Suspense fallback={<h1 className='teal'>Loading...</h1>}>
              <BrowserRouter>
                <Fragment>
                  <Header  {...this.state} logout={this.logout} />
                  <div className='col s12 '>
                    <Switch>
                        <Route exact path='/' render={(props) => <Home 
                                {...props} 
                                {...this.state} />} />
                        <Route path='/about' render={(props) => <About/>} />
                        <Route path='/post/details/:id' render={(props) => <PostDetails 
                                {...props} 
                                {...this.state}/>} />
                        <Route path='/user/details/:id' render={(props) =>
                              (!localStorage.hasOwnProperty('ujwt')) ? (<Redirect to="/"/>
                              ) : (<UserDetails {...props} {...this.state}/>)} />
                        <Route path='/auth' 
                              render={(props) => <Auth 
                                {...props} 
                                {...this.state}  
                                loginUser={this.loginUser}/>} />
                        <Route exact path='/post/create' 
                                render={(props) => 
                                  ((!localStorage.hasOwnProperty('ujwt')) || (localStorage.hasOwnProperty('isBlocked') && this.state.isBlocked === true)) ? (<Redirect to="/"/>
                                  ) : (<Create {...props} {...this.state}/>)} />
                        <Route exact path='/post/edit/:id' 
                                render={(props) => 
                                  (!localStorage.hasOwnProperty('ujwt')
                                  ) ? (<Redirect to="/"/>
                                  ) : (<EditPost {...props} {...this.state}/>)} />
                        <Route exact path='/user/all' 
                                render={(props) => 
                                  ((!localStorage.hasOwnProperty('isAdmin') || this.state.isAdmin === false) 
                                  ) ? (<Redirect to="/"/>
                                  ) : (<AllUsers {...props} {...this.state}/>)} />
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
