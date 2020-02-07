import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Identicon from 'identicon.js';

class PostListItem extends Component {
  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <img
            className="mr-2"
            width="30"
            height="30"
            alt="avatar"
            src={`data:image/png;base64,${new Identicon(this.props.post.author, 30).toString()}`}
          />
          <small className="text-muted">{this.props.post.author}</small>
        </div>
        <ul id="postList" className="list-group list-group-flush">
          <li className="list-group-item">
            <p>{this.props.post.content}</p>
          </li>
          <li className="list-group-item py-2">
            <small className="float-left mt-1 text-muted">
              Tips: {window.web3.utils.fromWei(this.props.post.tipAmount.toString(), 'Ether')} ETH
            </small>
            <button className="btn btn-link btn-sm float-right pt-0">
              <span>Tip 0.1 ETH</span>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default PostListItem;
