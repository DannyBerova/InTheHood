import React, { Component, Fragment, Suspense, lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.css'
import ErrorBoundary from './components/hocs/ErrorBoundary';
import PostService from './services/post-service';
import cnst from './utils/constants/constants'
import About from './components/About/About';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


const Home = lazy(() => import('./views/Home/HomeView'));
const Create = lazy(() => import('./views/Post/CreateView'));
const Auth = lazy(() => import('./Auth'));
const PostDetails = lazy(() => import('./views/Post/PostDetailsView'));
const EditPost = lazy(() => import('./views/Post/EditPostView'));
const UserDetails = lazy(() => import('./views/User/UserDetailsView'));
const DestroyUser = lazy(() => import('./views/User/DestroyUserView'));
const AllUsers = lazy(() => import('./views/Admin/AllUsersAdmin'));
const NoMatch = lazy(() => import('./components/NoMatch/NoMatch'));

class App extends Component {
  constructor(props) {
    super(props) 
    this.state={
      isAdmin: localStorage.getItem(cnst.isAdmin) === 'true' || false,
      isLoggedIn: false,
      jwtoken: localStorage.getItem(cnst.jwtoken) || null,
      user: localStorage.getItem(cnst.username) || null,
      userId: localStorage.getItem(cnst.userId) || null,
      isBlocked: localStorage.getItem(cnst.isBlocked) === 'true' || false,
      timeLoggedIn: localStorage.getItem(cnst.timeLoggedIn) || null,
      message: ''
    }

    this.PostService = new PostService();
    this.loginUser = this.loginUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentWillMount() {
      localStorage.removeItem(cnst.message)
      if(localStorage.getItem(cnst.userId)) {
        let oldDate = new Date(+localStorage.getItem(cnst.timeLoggedIn))
        let newDate = new Date(Date.now())
        let resultDiff =new Date( oldDate.setDate(oldDate.getDate() + 1))
        if(resultDiff < newDate) {
          this.logout()
          return;
        }
        this.setState({
          user: localStorage.getItem(cnst.username),
          userId: localStorage.getItem(cnst.userId),
          jwtoken: localStorage.getItem(cnst.jwtoken),
          timeLoggedIn: localStorage.getItem(cnst.timeLoggedIn),
          isLoggedIn: true,
          isAdmin: localStorage.getItem(cnst.isAdmin) === 'true',
          isBlocked: localStorage.getItem(cnst.isBlocked) === 'true',
          message: '',
        })       
      } else {
        this.setState({ message: '' })
      }
  }

   loginUser(user) {
    if(user && user.userId) {
       this.setState((prevState, props) => ({
        user: user.username,
        userId: user.userId,
        isLoggedIn: true,
        isAdmin: user.isAdmin,
        isBlocked: user.isBlocked,
        message: user.message,
        jwtoken: user.token
      }));
      localStorage.setItem(cnst.isAdmin, user.isAdmin);
      localStorage.setItem(cnst.isBlocked, user.isBlocked);
      localStorage.setItem(cnst.username, user.username);
      localStorage.setItem(cnst.userId, user.userId);
      localStorage.setItem(cnst.jwtoken, user.token);
      localStorage.setItem(cnst.timeLoggedIn, Date.now());
    }
  }

   async logout(event) {
    //event.preventDefault();
    let messageToSet='Logged Out! ';
    this.setState({
      isAdmin: false,
      isLoggedIn: false,
      user: null,
      userId: null,
      isFetched: false,
      message: messageToSet
    })
    localStorage.clear();
    toast.success(<h6 className="white-text center">{messageToSet}</h6>);
  }

  render() {
    return (
      <div className="App bgimg ">
       <ErrorBoundary>
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
                              (!localStorage.hasOwnProperty(cnst.jwtoken)) ? (<Redirect to="/"/>
                              ) : (<UserDetails {...props} {...this.state} logout={this.logout}/>)} />
                        <Route path='/auth' 
                              render={(props) => <Auth 
                                {...props} 
                                {...this.state}  
                                loginUser={this.loginUser}/>} />
                        <Route exact path='/post/create' 
                                render={(props) => 
                                  ((!localStorage.hasOwnProperty(cnst.jwtoken)) || (localStorage.hasOwnProperty(cnst.isBlocked) && this.state.isBlocked === true)) ? (<Redirect to="/"/>
                                  ) : (<Create {...props} {...this.state}/>)} />
                        <Route exact path='/post/edit/:id' 
                                render={(props) => 
                                  (!localStorage.hasOwnProperty(cnst.jwtoken)
                                  ) ? (<Redirect to="/"/>
                                  ) : (<EditPost {...props} {...this.state}/>)} />
                        <Route exact path='/user/destroy/:id' 
                                render={(props) => 
                                  (!localStorage.hasOwnProperty(cnst.jwtoken)
                                  ) ? (<Redirect to="/"/>
                                  ) : (<DestroyUser {...props} {...this.state} logout={this.logout}/>)} />
                        <Route exact path='/user/all' 
                                render={(props) => 
                                  ((!localStorage.hasOwnProperty(cnst.isAdmin) || this.state.isAdmin === false) 
                                  ) ? (<Redirect to="/"/>
                                  ) : (<AllUsers {...props} {...this.state}/>)} />
                        <Route render={() => <NoMatch/>}/>
                    </Switch>
                  </div>
                  <Fragment>
                  <ToastContainer 
                      position="bottom-right"
                      autoClose={4000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      pauseOnVisibilityChange
                      draggable
                      pauseOnHover/>
                    </Fragment>
                    <Footer  {...this.state} logout={this.logout} />
                  </Fragment>
              </BrowserRouter>
            </Suspense>
        </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
