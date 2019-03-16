import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import PostService from '../../services/post-service';
import WeatherService from '../../services/weather-service';
import Constants from '../../utils/constants/constants';

class SideNavRight extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            latestPost: {
              title: '',
              content: '',
              _id: '',
            },
            weather: { }
        }

        this.PostService = new PostService();
        this.WeatherService = new WeatherService();
        this.handleClick = this.handleClick.bind(this);
    }

   async componentWillMount() {
      let data = await this.PostService.latest();
      let weather = await this.WeatherService.sofia();
      if(weather) {
        localStorage.setItem(Constants.weather, weather.current.temp_c)
      }
      this.setState({ 
        latestPost: data,
      weather: {
        temp: weather.current.temp_c,
        text: weather.current.condition.text,
        icon: weather.current.condition.icon,
        }
      })       
  }

  handleClick(event) {
      this.props.filterPosts(event.target.value) 
  }

  render() {
    let detailsLink = `/post/details/${this.props.latest._id}` || '';
    let temp = this.state.weather ? this.state.weather.temp : '';
    let text = this.state.weather ? this.state.weather.text : '';
    let icon = this.state.weather ? this.state.weather.icon : '';
    let d =new Date(Date.now()); 

    let content, title, shortContent;
    if(this.props.latest !== undefined && this.props.latest.title !== undefined) {
      content = this.props.latest.content;
      title = this.props.latest.title;
      shortContent = this.props.latest ? (this.props.latest.content + '...') : '';
      if(this.props.latest && this.props.latest.content.length > 100) {
        shortContent = (this.props.latest.content.substr(0, 50) + '...') || ''
      }
    }
    return (
      <div className='col s2' >
        <ul className="teal" >
        <li className="teal"><h6 className="white-text ">TRENDING:</h6></li> 
          <li>
            <div className="card">
              <div className="card-content">
                <div  className="teal-text"   >
                  <p>Current Weather:</p>
                  <img src={icon} alt="weather"/>
                  <p>{d.toLocaleDateString()}</p>
                  <h5>Sofia {temp} &#8451;</h5>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          </li> 
          <li> 
            <div className="row">
              <div className="col s12">
                <div className="card">
                    {content !== undefined ? (
                      <Fragment>
                  <div className="card-content">
                  <h5 className='teal-text'>*LATEST*</h5>
                    <h5>{title}</h5>
                        <p>{shortContent}</p>
                  </div>
                  <div className="card-action">
                    <Link className="waves-effect teal darken-1  waves-light btn" to={detailsLink}><i className="material-icons left">cloud</i>Read more...</Link>
                  </div>
                  </Fragment>
                    ) : (<p>No posts!</p>)}
                </div>

              </div>
            </div>             
          </li>
        </ul>
      </div>
      );
  }
}
export default SideNavRight;
