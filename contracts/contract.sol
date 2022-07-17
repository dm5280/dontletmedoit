// SPDX-License-Identifier: Unlicensed




pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Gentemplate is ERC721Enumerable, Ownable, Pausable {
  using Strings for uint256;
 using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
  

  string public baseURI = "ipfs://";
  string  baseExtension = ".json";
  string contractmd = "ipfs://";
  uint256 public price = 0.05 ether;
  address marketWallet = 0x1337Ac082b17a7FE8059251c9caD2dc1733CC940;
  uint256 public maxSupply = 2000;
  uint256 public maxMintAmount = 5 ;
  mapping(address=>bool) allowedUsers;
 
  constructor() ERC721("Gentemplate", "BSCB") {
        
  }
 
 function contractURI() public view returns (string memory) {
        return contractmd;
    }

    function setContractMd(string memory _md) public onlyOwner {

        contractmd = _md;

    }

    function isWhitelisted(address user) public view returns (bool){

    return allowedUsers[user];
}

    modifier onlyusers() {
        require(allowedUsers[msg.sender]);
        _;
    }

    function showcount() public view returns (uint256){
    uint256 counter = _itemIds.current();
    return counter;
    }

  
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  function whitelistAddress (address user) public onlyOwner {
        allowedUsers[user]=true;
    }   

    function blacklistAddress (address user) public onlyOwner {
        allowedUsers[user]=false;
    } 
    function setWallet(address _wallet) external onlyOwner{

    marketWallet = _wallet;
    }

  function setmaxMintAmount(uint256 _newmaxMintAmount) external onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }


  function setmaxSupply(uint256 _newmaxSupply) external onlyOwner {
    maxSupply = _newmaxSupply;
  }

  function setBaseURI(string memory _newBaseURI) external onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) external onlyOwner {
    baseExtension = _newBaseExtension;
  }
  
  function setPrice (uint256 _price) external onlyOwner {

    price = _price;
  }


  
  function mint(address recpt, uint256 amount) internal  whenNotPaused  {

    uint256 supply = totalSupply();
    uint256 _mintAmount = amount;
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(_mintAmount <= maxMintAmount, "max mint amount per session exceeded");
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

     payable(marketWallet).transfer(price*amount);
    
    for (uint256 i = 1; i <= _mintAmount; i++) {
      bool ispaused = paused();
       require (!ispaused, "Paused");
      _safeMint(recpt, supply + i);
         _itemIds.increment();
    uint256 counter = _itemIds.current();
    if (counter == 100){
        _itemIds.reset();
        _pause();
    }
    }
  }
 
    function adminmint(address recpt, uint256 amount) external  whenNotPaused  onlyusers{
    uint256 supply = totalSupply();
    uint256 _mintAmount = amount;
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");
  
   for (uint256 i = 1; i <= _mintAmount; i++) {
      bool ispaused = paused();
       require (!ispaused, "Paused");
      _safeMint(recpt, supply + i);
         _itemIds.increment();
    uint256 counter = _itemIds.current();
    if (counter == 100){
        _itemIds.reset();
        _pause();
    }
    }
    }


  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );
    
    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

 

 
  function withdraw(address tokenToWithdraw) external onlyOwner {
	uint256 balance = IERC20(tokenToWithdraw).balanceOf(address(this));
	IERC20(tokenToWithdraw).transfer(msg.sender, balance);
	if (address(this).balance > 0) {
	    payable(msg.sender).transfer(address(this).balance);
	}
  }
 
    function pause() public onlyusers {
        _pause();
    }

    function unpause() public onlyusers {
        _unpause();
    }

  receive() external payable {
    mint(msg.sender, msg.value);
  }

   
}