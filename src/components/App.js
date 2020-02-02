import React, { Component } from 'react';
import Web3 from 'web3';

import './App.css';
import Navbar from './Navbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: '',
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

    this.setState({ account: accounts[0] });
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                Hello World
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
