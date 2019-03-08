import React, { Component } from 'react';
import './side.css'

class SideNavLeft extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            filter: true,
            redirect: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick(event) {
        this.props.filterPosts(event.target.value) 
    }

    render() {
        return (
            <div className='col s2' teal>
              <ul  >
              <li className="teal"><h6 className="white-text ">BY CATEGORY:</h6></li>
         
                <li><button type="text" class="waves-effect teal darken-2  waves-light btn-large" onClick={this.handleClick} value='' >ALL</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='info' >INFO</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='gossip' >GOSSIP</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='event' >EVENTS</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='fun' >FUN</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='education' >EDUCATION</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='adminSays' >ADMIN SAYS</button></li> 
                <li><button type="button" class="waves-effect teal darken-1  waves-light btn-large" onClick={this.handleClick} value='other' >OTHER</button></li> 
            </ul>
        </div>
    );
}

}
export default SideNavLeft;
