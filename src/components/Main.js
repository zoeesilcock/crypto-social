import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostListItem from './PostListItem';

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <PostForm onCreatePost={this.props.onCreatePost} />
            <div className="content mr-auto ml-auto">
              {this.props.posts.map((post, key) => <PostListItem post={post} key={key} />)}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  posts: PropTypes.array.isRequired,
  onCreatePost: PropTypes.func.isRequired,
}

export default Main;
