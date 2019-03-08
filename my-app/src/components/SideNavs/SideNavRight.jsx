import React, { Component } from 'react';
import PostService from '../../services/post-service';
import WeatherService from '../../services/weather-service';

// const weatherApiKey = '310b492d80f2f8aa6b6c4e50116906a7';
// const sofiaId = '727011'

class SideNavRight extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            latestPost: {
              title: '',
              content: '',
              _id: '',
             weather: {
               temp: 'a',
               icon: 'a',
               text: 'a'
             }
            }
            
        }

        this.PostService = new PostService();
        this.WeatherService = new WeatherService();
        this.handleClick = this.handleClick.bind(this);
    }

   async componentWillMount() {
          let data = await this.PostService.latest();
         // let weather = await this.WeatherService.sofia()
          let weather = await fetch("http://api.apixu.com/v1/current.json?key=ae5066bced2b4b2c8d9220032190803&q=Sofia`").then(res => res.json())
          if(weather) {
            localStorage.setItem('weather', weather.current)
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
      if(this.state.latestPost.content === undefined) {
        return <h2>No content</h2>
      }
        //TODO: utilities - string processing out
        let detailsLink = `/post/details/${this.state.latestPost._id}` || '';
        let shortContent = (this.state.latestPost.content) + '...' || '';
        let temp = this.state.weather ? this.state.weather.temp : '';
        let text = this.state.weather ? this.state.weather.text : '';
        let icon = this.state.weather ? this.state.weather.icon : '';
        let d =new Date(Date.now()); 
        if(this.state.latestPost.content.length > 100) {
          shortContent = (this.state.latestPost.content.substr(0, 50) + '...') || ''
        }
        return (
          <div className='col s2' >
            <ul >
            <li className="teal"><h6 className="white-text ">TRENDING:</h6></li> 
              <li><button type="text" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='toprated' >TOP RATED</button></li> 
              <li>
                    <div class="card">
                    <div class="card-content">
                <div  class="teal-text"   >
              <img src={icon} alt="weather"/>
              <p>{d.toLocaleDateString()}</p>
              <h5>Sofia {temp} &#8451;</h5>
              <p>{text}</p>
                </div>
                </div>
                  </div>
                </li>  
              <li>
                <div class="row">
                  <div class="col s12">
                    <div class="card">
                      <div class="card-content">
                        <h5 className='teal-text'>*LATEST*</h5>
                        <h5>{this.state.latestPost.title}</h5>
                            <p>{shortContent}</p>
                      </div>
                      <div class="card-action">
                        <a className="waves-effect teal darken-1  waves-light btn" href={detailsLink}><i class="material-icons left">cloud</i>Read more...</a>
                      </div>
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
