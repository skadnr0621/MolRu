// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
//
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {
    // uint256 private _tokenIds;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) tokenURIs;

    constructor() ERC721("SSAFYNFT", "SSAF") {
        // TODO
    }

    function current() public view returns (uint256) {
        // return _tokenIds;
        return _tokenIds.current();
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        // TODO

        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI)
        public
        returns (uint256)
    {
        // TODO

        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);

        tokenURIs[newTokenId] = _tokenURI;

        return newTokenId;
    }
}
