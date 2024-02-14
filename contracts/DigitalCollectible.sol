// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import 'hardhat/console.sol';

contract DigitalCollectible is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable
{
    uint256 private _currentTokenId = 0;

    event CollectibleCreated(address owner, uint256 tokenId, string uri);
    event CollectibleTransferred(address from, address to, uint256 tokenId);

    constructor(
        address initialOwner
    ) ERC721('DigitalCollectible', 'DC') Ownable(initialOwner) {}

    function createCollectible(
        string memory uri
    ) public onlyOwner returns (uint256) {
        _currentTokenId += 1;
        _safeMint(owner(), _currentTokenId);
        _setTokenURI(_currentTokenId, uri);

        emit CollectibleCreated(owner(), _currentTokenId, uri);

        return _currentTokenId;
    }

    function getCollectiblesOf(
        address owner
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        require(tokenCount > 0, 'No collectibles found for this address');

        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function transferNFT(address to, uint256 tokenId) public {
        console.log('Transfer nft %s %s', owner(), msg.sender);
        address from = msg.sender;
        require(
            ownerOf(tokenId) == from,
            'You are not the owner of this token'
        );
        require(to != address(0), 'Invalid address');
        safeTransferFrom(from, to, tokenId);
        emit CollectibleTransferred(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
