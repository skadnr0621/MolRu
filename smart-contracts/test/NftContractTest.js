/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  it("NFT mint, transfer, and compare URI", async () => {
    // TODO
    // 다음이 반드시 테스트되어야 합니다.
    // assert.equal(sender, owner, "NFT Mint Failed");
    // assert.equal(receiver, owner, "NFT Transfer Failed.");
    // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")

    const SsafyNFT = await NftCreator.deployed();

    // 1. create 호출 후 주소 1이 생성된 token의 owner이다.
    let newTokenId = (await SsafyNFT.create(accounts[0], "URI 1")).receipt.logs[0].args.tokenId.toNumber();
    let owner = await SsafyNFT.ownerOf(newTokenId);

    assert.equal(accounts[0], owner, "NFT Mint Failed");

    // 2. transferFrom 호출 후 주소 2가 token의 owner가 된다.
    await SsafyNFT.transferFrom(accounts[0], accounts[1], newTokenId);

    await SsafyNFT.ownerOf(newTokenId).then((result) => {
      owner = result;
    });

    assert.equal(accounts[1], owner, "NFT Transfer Failed");

    // 3. 저장한 tokenURI가 해당 token id로 조회한 tokenURI와 일치한다.
    let tokenURI = await SsafyNFT.tokenURI(newTokenId);
    assert.equal("URI 1", tokenURI, "Wrong Token Id or URI");
  });
});
