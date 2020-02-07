import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';
import Navbar from './Navbar';
import Main from './Main';
import SocialNetwork from '../abis/SocialNetwork.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
      postCount: 0,
      posts: [],
      loading: true,
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

    this.setState({ account: accounts[0], loading: false, socialNetwork, postCount, posts });
  }

  handleCreatePost = (content) => {
    this.setState({ loading: true });

    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
    .once('receipt', () => {
      this.loadBlockchainData();
    });
  }

  handleTipPost = (postId, tipAmount) => {
    this.setState({ loading: true });

    this.state.socialNetwork.methods.tipPost(postId).send({ from: this.state.account, value: tipAmount })
    .once('receipt', () => {
      this.loadBlockchainData();
    });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ?
          <div id="loader" className="text-center mt-5"><p>Loading...</p></div> :
          <Main
            posts={this.state.posts}
            onCreatePost={this.handleCreatePost}
            onTipPost={this.handleTipPost}
          />
        }
      </div>
    );
  }
}

export default App;
