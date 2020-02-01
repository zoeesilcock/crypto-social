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
});
