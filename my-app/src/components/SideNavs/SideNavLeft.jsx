import React, { Component } from 'react';
import './side.css'

class SideNavLeft extends Component {
    constructor(props) {
        super(props) 
        this.state ={
            filter: true,
            activeLink: '',
            redirect: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.filterPosts(event.target.value) 
        this.setState({activeLink: event.target.value})
    }

    render() {
        const allIsActive = this.state.activeLink === 'all' ? '2' : '1';
        const topRatedIsActive = this.state.activeLink === 'toprated' ? '2' : '1';
        const infoIsActive = this.state.activeLink === 'info' ? '2' : '1';
        const gossipIsActive = this.state.activeLink === 'gossip' ? '2' : '1';
        const eventsIsActive = this.state.activeLink === 'event' ? '2' : '1';
        const funIsActive = this.state.activeLink === 'fun' ? '2' : '1';
        const educationIsActive = this.state.activeLink === 'education' ? '2' : '1';
        const adminSaysIsActive = this.state.activeLink === 'adminSays' ? '2' : '1';
        const otherSaysIsActive = this.state.activeLink === 'other' ? '2' : '1';

        return (
            <div className='col s2 teal'>
              <ul className="teal" >
              <li className="teal"><h6 className="white-text ">BY CATEGORY:</h6></li>
                <li className={allIsActive}><button type="text" className={"waves-effect btn-large teal darken-" + allIsActive} onClick={this.handleClick} value='all' >ALL</button></li> 
                <li className={topRatedIsActive}><button type="text" className={"waves-effect btn-large teal darken-" + topRatedIsActive} onClick={this.handleClick} value='toprated' >TOP RATED</button></li> 
                <li className={infoIsActive}><button type="button" className={"waves-effect btn-large teal darken-" + infoIsActive} onClick={this.handleClick} value='info' >INFO</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + gossipIsActive} onClick={this.handleClick} value='gossip' >GOSSIP</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + eventsIsActive} onClick={this.handleClick} value='event' >EVENTS</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + funIsActive} onClick={this.handleClick} value='fun' >FUN</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + educationIsActive} onClick={this.handleClick} value='education' >EDUCATION</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + adminSaysIsActive} onClick={this.handleClick} value='adminSays' >ADMIN SAYS</button></li> 
                <li><button type="button" className={"waves-effect btn-large teal darken-" + otherSaysIsActive} onClick={this.handleClick} value='other' >OTHER</button></li> 
            </ul>
        </div>
    );
}

}
export default SideNavLeft;
