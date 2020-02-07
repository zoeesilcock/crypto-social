import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postContent: '',
    }
  }

  handleContentChange = (event) => {
    this.setState({ postContent: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreatePost(this.state.postContent);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mt-4 mb-4">
        <div className="form-group mr-sm-2">
          <input
            id="postContent"
            type="text"
            className="form-control"
            placeholder="What's on your mind?"
            onChange={this.handleContentChange}
            value={this.state.postContent}
            required
          />
          <button
            type="submit"
            className="btn btn-primary btn-block mt-3"
          >
            Share
          </button>
        </div>
      </form>
    );
  }
}

PostForm.propTypes = {
  onCreatePost: PropTypes.func.isRequired,
}

export default PostForm;
