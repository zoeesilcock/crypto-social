import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';
import Navbar from './Navbar';
import PostListItem from './PostListItem';
import SocialNetwork from '../abis/SocialNetwork.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      postCount: 0,
      posts: [],
    }
  }

  async componentWillMount() {
    await this.loadWeb3();

    if (window.web3) {
      await this.loadBlockchainData();
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. Please install Metamask or use Brave.');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = SocialNetwork.networks[networkId];
    let socialNetwork = null;
    let postCount = 0;
    let posts = [];

    if (networkData) {
      socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address);
      postCount = await socialNetwork.methods.postCount().call();

      for (let i = 1; i <= postCount; i++) {
        posts.push(await socialNetwork.methods.posts(i).call());
      }
    } else {
      window.alert('SocialNetwork contract has not been deployed to the blockchain.');
    }

    this.setState({ account: accounts[0], socialNetwork, postCount, posts });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                {this.state.posts.map((post, key) => <PostListItem post={post} key={key} />)}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
