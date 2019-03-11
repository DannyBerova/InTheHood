import React, { Component } from 'react';

class Search extends Component {
    render() {
        return(
        <div className="row">
            <div className="col s8 offset-s1">
                <i class="material-icons left">search</i>
                <input className="input-field col s11 " type="text" onChange={this.props.handleChange} 
                    onKeyPress={event => { if (event.key === 'Enter') { this.props.searching() }}}   
                    name="search" placeholder="Search..." value={this.props.search}/>
            </div>
            <div className="col s2">
                <button type="button" id = "btnSearch" className="waves-effect teal darken-1  waves-light btn" onClick={this.props.searching} value='info' >SEARCH</button>
            </div>
        </div>
        )
    }
}

export default Search;