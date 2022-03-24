// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */
contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor() {
        admin = msg.sender;
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다.
     */
    function createSale(
        uint256 itemId,
        uint256 minPrice,
        uint256 purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        // TODO

        // address _admin,
        // address _seller,
        // uint256 _tokenId,
        // uint256 _minPrice,
        // uint256 _purchasePrice,`
        // uint256 startTime,
        // uint256 endTime,
        // address _currencyAddress,
        // address _nftAddress
        Sale newSale = new Sale(
            admin,
            msg.sender, // TODO
            itemId,
            minPrice,
            purchasePrice,
            startTime,
            endTime,
            currencyAddress,
            nftAddress
        );

        sales.push(address(newSale));
        emit NewSale(address(newSale), msg.sender, itemId);

        return address(newSale);
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public saleStartTime;
    uint256 public saleEndTime;
    uint256 public minPrice;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    // 현재 최고 입찰 상태
    address public highestBidder;
    uint256 public highestBid;

    address[] bidders;
    mapping(address => uint256) bidHistory;

    IERC20 public erc20Contract;
    IERC721 public erc721Contract;

    event HighestBidIncreased(address bidder, uint256 amount);
    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _minPrice,
        uint256 _purchasePrice,
        uint256 startTime,
        uint256 endTime,
        address _currencyAddress,
        address _nftAddress
    ) {
        require(_minPrice > 0);
        tokenId = _tokenId;
        minPrice = _minPrice;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        saleStartTime = startTime;
        saleEndTime = endTime;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Contract = IERC721(_nftAddress);
    }

    function bid(uint256 bid_amount) public onlyNotSeller onlyValidTime {
        // TODO

        require(
            erc20Contract.allowance(msg.sender, address(this)) > 0,
            "You didn't approve sending"
        );
        require(bid_amount >= minPrice, "Bid over minimum price");
        require(
            bid_amount > highestBid,
            "Bid over currently highest bid amount"
        );
        require(bid_amount < purchasePrice, "Bid under purchase price");

        // refund();

        highestBid = bid_amount;
        highestBidder = msg.sender;
        emit HighestBidIncreased(msg.sender, bid_amount);

        // erc20Contract.transferFrom(msg.sender, address(this), bid_amount);
    }

    function purchase() public onlyNotSeller onlyValidTime {
        // TODO

        require(
            erc20Contract.allowance(msg.sender, address(this)) > 0,
            "You didn't approve sending"
        );

        // refund();

        erc20Contract.transferFrom(msg.sender, seller, purchasePrice);
        erc721Contract.transferFrom(seller, msg.sender, tokenId);

        buyer = msg.sender;
        _end();

        emit SaleEnded(buyer, purchasePrice);
    }

    function confirmItem() public onlyAfterEnd {
        // TODO

        require(msg.sender == highestBidder, "You are not the highest bidder.");

        erc20Contract.approve(highestBidder, highestBid);
        erc20Contract.transferFrom(highestBidder, seller, highestBid);
        erc721Contract.transferFrom(seller, highestBidder, tokenId);

        buyer = highestBidder;
        _end();

        emit SaleEnded(buyer, highestBid);
    }

    function cancelSales() public onlyUserPermissioned onlyValidTime {
        // TODO

        // refund();

        erc721Contract.transferFrom(
            erc721Contract.ownerOf(tokenId),
            seller,
            tokenId
        );

        _end();
        emit SaleEnded(seller, 0);
    }

    function refund() public {
        // if (highestBidder != address(0)) {
        //     erc20Contract.transferFrom(
        //         currencyAddress,
        //         highestBidder,
        //         highestBid
        //     );
        // }

        if (highestBidder != address(0)) {
            require(
                erc20Contract.balanceOf(address(this)) >= highestBid,
                "lack of balance"
            );

            erc20Contract.transferFrom(
                address(this),
                highestBidder,
                highestBid
            );
        }
    }

    function getTimeLeft() public view returns (int256) {
        return (int256)(saleEndTime - block.timestamp);
    }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256,
            address,
            address
        )
    {
        return (
            saleStartTime,
            saleEndTime,
            minPrice,
            purchasePrice,
            tokenId,
            highestBidder,
            highestBid,
            currencyAddress,
            nftAddress
        );
    }

    function getHighestBid() public view returns (uint256) {
        return highestBid;
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    // modifier를 사용하여 함수 동작 조건을 재사용하는 것을 권장합니다.
    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }

    modifier onlyNotSeller() {
        require(msg.sender != seller, "Sale: You are the seller.");
        _;
    }

    modifier onlyUserPermissioned() {
        require(
            msg.sender == seller || msg.sender == admin,
            "You are neither seller nor admin."
        );
        _;
    }

    modifier onlyValidTime() {
        require(
            block.timestamp >= saleStartTime,
            "Sale: This sale is not started yet"
        );
        require(
            block.timestamp < saleEndTime && !ended,
            "Sale: This sale is already ended."
        );
        _;
    }

    modifier onlyAfterEnd() {
        require(
            block.timestamp > saleEndTime,
            "Sale: This sale is not ended yet."
        );
        _;
    }
}
