const SocialNetwork = artifacts.require('./SocialNetwork.sol');

require('chai').use(require('chai-as-promised')).should();

contract('SocialNetwork', ([deployer, author, tipper]) => {
  let socialNetwork;

  describe('deployment', async () => {
    before(async () => {
      socialNetwork = await SocialNetwork.deployed();
    });

    it('deploys successfully', async () => {
      const address = await socialNetwork.address;

      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await socialNetwork.name();

      assert.equal(name, 'CryptoSocial');
    });
  });

  describe('posts', async () => {
    const expectedContent = 'Hello world!';
    let result, postCount;

    before(async () => {
      result = await socialNetwork.createPost(expectedContent, { from: author });
      postCount = await socialNetwork.postCount();
    });

    it('creates posts', async () => {
      const event = result.logs[0].args;

      assert.equal(postCount, 1);
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(event.content, expectedContent, 'content is correct');
      assert.equal(event.tipAmount, '0', 'tip amount is correct');
      assert.equal(event.author, author, 'author is correct');
    });

    it('does not allow empty content', async () => {
      await socialNetwork.createPost('', { from: author }).should.be.rejected;
    });

    it('lists posts', async () => {
      const post = await socialNetwork.posts(postCount);

      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(post.content, expectedContent, 'content is correct');
      assert.equal(post.tipAmount, '0', 'tip amount is correct');
      assert.equal(post.author, author, 'author is correct');
    });

    it('allows users to tip posts', async () => {
      const tip = web3.utils.toWei('1', 'Ether');
      const tipAmount = new web3.utils.BN(tip);
      let oldAuthorBalance = await web3.eth.getBalance(author);
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance);
      const expectedBalance = oldAuthorBalance.add(tipAmount);

      result = await socialNetwork.tipPost(postCount, { from: tipper, value: tip });

      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct');
      assert.equal(event.content, expectedContent, 'content is correct');
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct');
      assert.equal(event.author, author, 'author is correct');

      let newAuthorBalance = await web3.eth.getBalance(author);
      newAuthorBalance = new web3.utils.BN(newAuthorBalance);

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString());
    });

    it('does not allow tipping a post that does not exist', async () => {
      const tip = web3.utils.toWei('1', 'Ether');
      await socialNetwork.tipPost(99, { from: tipper, value: tip }).should.be.rejected;
    })
  });
});
