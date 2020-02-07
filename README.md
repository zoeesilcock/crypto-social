# CryptoSocial

A social network which allows users to tip posters with cryptocurrency. Posts are then displayed in order of how much cryptocurrency they have received.


## Dependencies
* Node
* Ganache (private blockchain)
* Truffle 5.0.5 (framework for building smart contracts)
* MetaMask chrome extension (or Brave)


## Contract
The smart contract should do the following things:

* Create posts
* List all the posts
* Tip posts


## Development
Once you have Ganache running locally you need to run the Truffle migrations once before anything else:
```
truffle migrate
```

Start the server run:
```
docker-compose up
```

Run the smart contract tests:
```
truffle test
```

In order to use the application you'll need to import one or more of the wallets from your local Ganache blockchain into Metamask (or Brave) and switch to one of those wallets. The wallet you have selected will be your user account on the application so it will only work with wallets from your local Ganache blockchain.

Visit http://localhost:3000

Make sure that your first post is "Hello World!" :)
