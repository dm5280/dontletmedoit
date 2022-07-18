// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./ERC721A/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
<<<<<<< HEAD
import "@openzeppelin/contracts/utils/Strings.sol";
=======
>>>>>>> 014a9676e742854de8a9be29144537dfa9dbc70e

contract dontletmedoit is ERC721A, Ownable, ReentrancyGuard {
    using Strings for uint256;
    uint256 public constant Max_Supply = 1000;
    uint256 public constant Max_per_Wallet = 10;
    uint256 public price = 0.0045 ether;
    uint256 public step1 = 0.0035 ether;
    uint256 public step2 = 0.0025 ether;
    uint256 public step3 = 0.002 ether;
    address[] OldCloudyList = [
        0xB8fc3F80Ee817D7A33E79fC19ed22eF5886392B3,
        0x5D2B4063Aedb121B5C8AeEA39f9626F04Da6bFFb,
        0x207f96D5200d5174601623F074E9EfAEEE647e36,
        0x938D5f00966817f447D144B706b4a731c1688328,
        0xF63A2D5eB441eE65fD06da516889685A8a175c4e,
        0x13799274f512C30055850474E64DeDc2483EbAA5,
        0x7Bba772645680F5FA25152Aca0c1Ba0711139fA5,
        0x26159a4400FeaC34e760b0503b725d60cc92d04F,
        0x8cA1c650a1FEca30C261a6DaE1472DC30Ed6791B,
        0xE2f440a687E7eFB5865FbcabBC281Cd13053f6A5
    ];
    address NFT = 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8;

    string private _baseTokenURI = "ipfs://";

    bool public isActive = false;

    mapping(address => uint256) public totalMint;

    mapping(address => bool) allowedUsers;

    constructor() ERC721A("Elmira's tits", "ELMT") {}

    event Minted(address minter, uint256 quantity);

    function burn(uint256 token) public {
        _burn(token);
    }

    function whitelistAddress(address user) public onlyOwner {
        allowedUsers[user] = true;
    }

    function blacklistAddress(address user) public onlyOwner {
        require(user != owner(), "Owner");
        allowedUsers[user] = false;
    }

    function isWhitelisted(address user) public view returns (bool) {
        return allowedUsers[user];
    }

    modifier adminUsers() {
        require(allowedUsers[msg.sender] || msg.sender == owner());
        _;
    }

    function setNFT(address _nft) public adminUsers {
        NFT = _nft;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory _URI) external adminUsers {
        _baseTokenURI = _URI;
    }

    function setPriceStep(
        uint256 _price,
        uint256 _step1,
        uint256 _step2,
        uint256 _step3
    ) external adminUsers {
        price = _price;
        step1 = _step1;
        step2 = _step2;
        step3 = _step3;
    }

    function setActive(bool _state) external onlyOwner {
        isActive = _state;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "no token");

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function checkCloudy(address _holder) public view returns (bool isHolder) {
        bool cholder;

        if (ERC721A(NFT).balanceOf(_holder) > 0) {
            cholder = true;
        }

        for (uint256 i = 0; i < OldCloudyList.length; i++) {
            if (_holder == OldCloudyList[i]) {
                cholder = true;
            }
        }
        return cholder;
    }

    function mint(uint256 _quantity) external payable nonReentrant {
        require(isActive, "Not active");
        require(_quantity > 0, "No 0 mint");
        require(
            (totalMint[msg.sender] + _quantity) <= Max_per_Wallet,
            "More then 10"
        );
        if (_quantity >= 2 && _quantity <= 5) {
            require(msg.value >= (_quantity * step1), "No Eth");
        }
        if (_quantity >= 6 && _quantity <= 8) {
            require(msg.value >= (_quantity * step1), "No Eth");
        }

        if (_quantity > 9) {
            require(msg.value >= (_quantity * step3), "No Eth");
        } else {
            require(msg.value >= price, "No Eth");
        }

        if (checkCloudy(msg.sender)) {
            _quantity = _quantity + 1;
        }

        require((totalSupply() + _quantity) <= Max_Supply, "Max supply");

        totalMint[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);

        emit Minted(msg.sender, _quantity);
    }

    function adminMint(address _recp, uint256 _quantity)
        external
        nonReentrant
        onlyOwner
    {
        require(isActive, "Not active");
        _safeMint(_recp, _quantity);
        totalMint[_recp] += _quantity;

        emit Minted(_recp, _quantity);
    }

    function withdraw(address _address, uint256 amount)
        public
        onlyOwner
        nonReentrant
    {
        (bool os, ) = payable(_address).call{value: amount}("");
        require(os);
        //---
    }
}
