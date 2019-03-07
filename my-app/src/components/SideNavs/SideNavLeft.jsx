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
        event.preventDefault()
        console.log(event.target.value)
        console.log(event.target.name)
        this.props.searchByString(event.target.value) 
        this.setState({filter: 'info'})
    }

    render() {
        //let ifAdmin = (this.props.isAdmin) ? (<span><NavLink to="/movies/create" onClick={this.handleClick}>Create</NavLink></span>) : (null)
        return (
            <div className='col s2' teal>
              <ul className='teal darken-1 ' >
                <li><h5> BY CATEGORY:</h5></li> 
         
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
