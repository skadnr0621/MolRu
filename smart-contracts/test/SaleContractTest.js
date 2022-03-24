/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, salesFactoryContract, nftContract, salesContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
  const mintAmount = 10000;
  const uri = "testURI";

  async function print(title) {
    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2];
    console.log(`\n--------------------  ${title} --------------------`);
    console.log(`Seller: ${seller} ${await getBalance(seller)}`);
    console.log(`Bidder1: ${bidder1} ${await getBalance(bidder1)}`);
    console.log(`Bidder2: ${bidder2} ${await getBalance(bidder2)}\n`);
  }

  it("Bid and confirm", async () => {
    const seller = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2]; // purchaser

    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(bidder2, await getNftOwner(), "Confirm Failed");
    // assert.equal(1000, await getBalance(bidder1), "Refund Failed");

    // 1. 임의의 ERC-20 토큰 생성 후 10,000 토큰 발행
    const ssafyToken = await SsafyToken.deployed();
    await ssafyToken.mint(mintAmount);

    // console.log((await ssafyToken.totalSupply.call()).toNumber(), (await ssafyToken.balanceOf.call(accounts[0])).toNumber());
    assert.equal((await ssafyToken.totalSupply.call()).toNumber(), 10000, "token minting error");
    assert.equal((await ssafyToken.balanceOf.call(accounts[0])).toNumber(), 10000, "token balance error");

    // 2. 두 제안자 주소로 1,000 토큰 부여
    await ssafyToken.forceToTransfer(seller, bidder1, 1000);
    await ssafyToken.forceToTransfer(seller, bidder2, 1000);

    assert.equal((await ssafyToken.balanceOf.call(bidder1)).toNumber(), 1000, "token transfer error 1");
    assert.equal((await ssafyToken.balanceOf.call(bidder2)).toNumber(), 1000, "token transfer error 2");

    // 3. 판매자 NFT 생성 (최저 제안가 10, 즉시 구매가 100, 판매 시작 시간 = 현재 시각, 판매 종료 시각 = 10초 후)
    // 3-1. 판매할 NFT 생성
    const ssafyNft = await SsafyNFT.deployed();
    await ssafyNft.create(seller, uri);

    var result = await ssafyNft.getPastEvents("Transfer", { fromBlock: "latest" });
    const tokenId = result[0].returnValues.tokenId;
    assert.equal(await ssafyNft.ownerOf.call(tokenId), seller, "NFT minting error");

    // 3-2. Sale 생성
    const saleFactory = await SaleFactory.deployed();
    const now = Math.floor(Date.now() / 1000);
    await saleFactory.createSale(tokenId, 10, 100, now, now + 10, ssafyToken.address, ssafyNft.address);

    var result = await saleFactory.getPastEvents("NewSale", { fromBlock: "latest" });
    const sale = await Sale.at(result[0].returnValues._saleContract);
    // await sale.getSaleInfo
    //   .call()
    //   .then((result) => console.log(result[0].toNumber(), result[1].toNumber(), Date.now()))
    //   .catch((err) => console.log(err));

    // 3-3. ERC-20 approve
    await ssafyToken.approve(sale.address, 1000, { from: bidder1 }).catch((err) => console.log(err));
    await ssafyToken.approve(sale.address, 1000, { from: bidder2 }).catch((err) => console.log(err));
    // await ssafyToken.approve(bidder1, 1000, { from: sale.address }).catch((err) => console.log(err));
    // await ssafyToken.approve(bidder2, 1000, { from: sale.address }).catch((err) => console.log(err));
    // await ssafyToken.getPastEvents("Approval", { fromBlock: 0 }).then((result) => console.log("Approval ----------------------", result));

    // 3-4 ERC-721 approve
    await ssafyNft.approve(sale.address, tokenId);

    // 4. 제안자1, 15 토큰 bid() 호출
    await sale.bid(15, { from: bidder1 }).catch((err) => console.log(err));
    assert.equal((await sale.getHighestBid.call()).toNumber(), 15, "Sale bid error 1");
    // await sale.getPastEvents().then((result) => console.log("RESULT HERE 1 ~~~~~~~~~~~ ", result));
    // await ssafyToken.balanceOf.call(bidder1).then((result) => console.log("Bidder 1 balance : " + result.toNumber()));

    // 5. 제안자2, 20 토큰 bid() 호출
    await sale.bid(20, { from: bidder2 }).catch((err) => console.log(err));
    assert.equal((await sale.getHighestBid.call()).toNumber(), 20, "Sale bid error 2");
    // await sale.getPastEvents().then((result) => console.log("RESULT HERE 2 ~~~~~~~~~~~ ", result));
    // await ssafyToken.balanceOf.call(bidder2).then((result) => console.log("Bidder 2 balance : " + result.toNumber()));

    // 6. 10초 후 제안자 2가 confirmItem() 호출
    await new Promise((resolve) => {
      setTimeout(async () => {
        await sale.confirmItem({ from: bidder2 }).catch((err) => console.log(err));
        resolve();
      }, 10 * 1000);
    }).catch((err) => console.log(err));

    assert.equal(await ssafyNft.ownerOf.call(tokenId), bidder2, "Sale confirm error");
    assert.equal((await ssafyToken.balanceOf.call(bidder1)).toNumber(), 1000, "Sale refund error");
  });

  it("Bid and Purchase", async () => {
    const seller = accounts[0];
    const bidder = accounts[3];
    const purchaser = accounts[4];

    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
    // assert.equal(1000, await getBalance(bidder), "Refund Failed");
    // assert.equal(900, await getBalance(purchaser), "Transfer Failed");

    // 1. 임의의 ERC-20 토큰 생성 후 10,000 토큰 발행
    ssafyTokenContract = await SsafyToken.deployed();
    await ssafyTokenContract.mint(mintAmount);

    // 2. 제안자와 구매자 주소로 각 1,000 토큰 부여
    await ssafyTokenContract.forceToTransfer(seller, bidder, 1000);
    await ssafyTokenContract.forceToTransfer(seller, purchaser, 1000);

    // 3. 판매자 NFT 생성 (최저 제안가 10, 즉시 구매가 100, 판매 시작 시간 = 현재 시각, 판매 종료 시각 = 10초 후)
    // 3-1. NFT 생성
    nftContract = await SsafyNFT.deployed();
    await nftContract.create(seller, uri);
    await nftContract.getPastEvents("Transfer", { fromBlock: "latest" }).then((result) => {
      itemId = result[0].returnValues.tokenId;
    });
    // 3-2. Sale 생성
    salesFactoryContract = await SaleFactory.deployed();

    const now = Math.floor(Date.now() / 1000);
    await salesFactoryContract.createSale(itemId, 10, 100, now, now + 10, ssafyTokenContract.address, nftContract.address);
    await salesFactoryContract.getPastEvents("NewSale", { fromBlock: "latest" }).then(async (result) => {
      salesContract = await Sale.at(result[0].returnValues._saleContract);
    });

    // 3-3. ERC-20 approve
    await ssafyTokenContract.approve(salesContract.address, 1000, { from: bidder }).catch((err) => console.log("tokenContract approve error"));
    await ssafyTokenContract.approve(salesContract.address, 1000, { from: purchaser }).catch((err) => console.log("tokenContract approve error"));

    // 3-4. ERC-721 approve
    await nftContract.approve(salesContract.address, itemId).catch((err) => console.log("nftContract approve error"));

    // 4. 제안자, 15 토큰 bid() 호출
    await salesContract.bid(15, { from: bidder }).catch((err) => console.log("salesContract bid error"));

    // 5. 구매자, 100 토큰 purchase() 호출
    await salesContract.purchase({ from: purchaser }).catch((err) => console.log("salesContract purchase error", err));

    /**
     * 검증
     * - 최종 NFT 소유자가 판매자
     * - 제안자의 잔액이 초기 값 1000과 같음
     */
    assert.equal(await nftContract.ownerOf.call(itemId), purchaser, "Purchaser is not the owner !!!");
    assert.equal(await ssafyTokenContract.balanceOf.call(bidder), 1000, "Bidder balance is not equal to initial balance !!!");
  });

  it("Bid and Cancel", async () => {
    const seller = accounts[0];
    const bidder = accounts[5];

    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
    // assert.equal(1000, await getBalance(bidder), "Refund Failed");

    // 1. 임의의 ERC-20 토큰 생성 후 10,000 토큰 발행
    ssafyTokenContract = await SsafyToken.deployed().catch((err) => console.log("SsafyToken deployed error", err));

    await ssafyTokenContract.mint(mintAmount).catch((err) => console.log("ssafyTokenContract mint error", err));

    // 2. 제안자와 구매자 주소로 각 1,000 토큰 부여
    await ssafyTokenContract.forceToTransfer(seller, bidder, 1000).catch((err) => console.log("ssafyTokenContract forceToTransfer error 1", err));
    await ssafyTokenContract.forceToTransfer(seller, seller, 1000).catch((err) => console.log("ssafyTokenContract forceToTransfer error 2", err));
    // 3. 판매자 NFT 생성 (최처 제안가 10, 즉시 구매가 100, 판매 시작 시간 = 현재 시각, 판매 종료 시각 = 10초 후)
    // 3-1. NFT 생성
    nftContract = await SsafyNFT.deployed().catch((err) => console.log("SsafyFNT deployed error", err));
    await nftContract.create(seller, uri).catch((err) => console.log("nftContract create error", err));
    await nftContract.getPastEvents("Transfer", { fromBlock: "latest" }).then((result) => {
      itemId = result[0].returnValues.tokenId;
    });

    // 3-2. Sale 컨트랙트 생성
    salesFactoryContract = await SaleFactory.deployed().catch((err) => console.log("SaleFactory deployed error", err));

    const now = Math.floor(Date.now() / 1000);
    await salesFactoryContract
      .createSale(itemId, 10, 100, now, now + 10, ssafyTokenContract.address, nftContract.address)
      .catch((err) => console.log("salesFactoryContract createSale error", err));

    await salesFactoryContract.getPastEvents("NewSale", { fromBlock: "latest" }).then(async (result) => {
      salesContract = await Sale.at(result[0].returnValues._saleContract);
    });

    // 3-3 ERC-20 approve
    await ssafyTokenContract
      .approve(salesContract.address, 1000, { from: bidder })
      .catch((err) => console.log("ssafyTokenContract approve error", err));
    await ssafyTokenContract
      .approve(salesContract.address, 1000, { from: seller })
      .catch((err) => console.log("ssafyTokenContract approve error", err));
    // 3-4 ERC-721 approve
    await nftContract.approve(salesContract.address, itemId).catch((err) => console.log("nftContract approve error", err));

    // 4. 제안자, 15 토큰 bid() 호출
    await salesContract.bid(15, { from: bidder }).catch((err) => console.log("salesContract bid error", err));

    // 5. 판매자 cancel() 즉시 호출
    await salesContract.cancelSales({ from: seller }).catch((err) => console.log("salesContract cancelSales error", err));

    /**
     * 검증
     * - 최종 NFT의 소유자가 판매자
     * - 제안자의 잔액이 초기값 1000과 같음
     */
    assert.equal(await nftContract.ownerOf.call(itemId), seller, "Seller doesn't possess the NFT !!!");
    assert.equal((await ssafyTokenContract.balanceOf.call(bidder)).toNumber(), 1000, "Bidder balance is not equal to initial balance !!!");
  });
});
