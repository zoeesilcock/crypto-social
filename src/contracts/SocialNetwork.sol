pragma solidity ^0.5.0;

contract SocialNetwork {
  string public name;
  uint public postCount = 0;
  mapping(uint => Post) public posts;

  struct Post {
    uint id;
    string content;
    uint tipAmount;
    address author;
  }

  event PostCreated(
    uint id,
    string content,
    uint tipAmount,
    address author
  );

  constructor() public {
    name = "CryptoSocial";
  }

  function createPost(string memory _content) public {
    // Require valid content
    require(bytes(_content).length > 0, 'Content is required');

    // Increment post count
    postCount += 1;

    // Create the post
    posts[postCount] = Post(postCount, _content, 0, msg.sender);

    // Trigger event
    emit PostCreated(postCount, _content, 0, msg.sender);
  }
}
