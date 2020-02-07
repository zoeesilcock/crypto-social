import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import PostListItem from './PostListItem';

class Main extends Component {
  sortByTips = (a, b) => {
    return b.tipAmount - a.tipAmount;
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <PostForm
              onCreatePost={this.props.onCreatePost}
            />
            <div className="content mr-auto ml-auto">
              {this.props.posts.sort(this.sortByTips).map((post, key) => (
                <PostListItem
                  post={post}
                  key={key}
                  onTipPost={this.props.onTipPost}
                />
              ))}
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
  onTipPost: PropTypes.func.isRequired,
}

export default Main;
