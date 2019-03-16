import React, { Component } from 'react';

import PostCard from '../Post/PostCard';
import Pagination from "../pagination";

class Home extends Component {
  render() {
    const {
        filteredPosts,
        currentPosts,
        currentPage,
        totalPages
      } = this.props;
      const totalPosts = filteredPosts.length;
  
      if (totalPosts === 0) 
      return <p>No posts found!</p>;

      let filterAdded = this.props.filter === '' ? '' : ` * Filtered by: ${this.props.filter}`
      
    return (
      <div className="row ">
        <div className="row d-flex flex-row py-5">
          <div className="w-90 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <p className="teal-text align-items-center">
                {currentPage && (
                    <span>Page {currentPage} / {" "}
                    {totalPages} {filterAdded} </span>
                )}
              </p>
              <div className="d-flex flex-row py-4   ">
                <Pagination
                    totalRecords={this.props.filteredPosts.length}
                    totalPages={totalPages}
                    records={filteredPosts}
                    pageLimit={5}
                    pageNeighbours={1}
                    onPageChanged={this.props.onPageChanged}
                />
              </div>
          </div>
            {(filteredPosts.length > 0 
              ) ? (currentPosts.map(post => (
                  <PostCard key={post._id} post={post} /> ))
              ) : (<h4>No posts found!</h4>)
            }
          </div>
      </div>
      );
  }
}
export default Home;