import * as Yup from "yup";
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Link, Modal, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import Web3 from "web3";
import moment from "moment";
import Page from "../components/Page";
import COMMON_HEADER from "../common/HeaderType";
import COMMON_ABI from "../common/ABI";
import getSaleInfoBy from "../common/SaleInfoGetter";
import { onResponse, onContractCall, onInvalidAddress } from "../common/ErrorMessage";
import getAddressFrom from "../utils/AddressExtractor";
import sendTransaction from "../utils/TxSender";
import { convertToAccountingFormat } from "../utils/NumberFormatter";
import { motion } from "framer-motion";
import { MotionContainer, varBounceIn } from "../components/animate";

// 이미지 스타일
const ImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
});

/**
 * [구매(거래)]를 위한 화면
 */
const ItemPurchase = () => {
  // [변수] 토큰 ID (URL 파라미터 사용)
  const tokenId = useLocation().pathname.substring(11);

  // [변수] 아이템, 작품명, 아이템 소개, 판매자, 판매자 주소, 전시 종료일, 거래 가능 토큰 주소, 심볼, 즉시 구매가, 최소 제안가,
  //       최고 제안가, 최고 제안자, 잔액, 토큰 URI, 컬렉션 유무, 처리 완료 여부, 현재 시간, 판매 종료 시간, 판매 종료 여부,
  //       판매중 여부
  const [item, setItem] = useState("");
  const [itemName, setItemName] = useState("작품명");
  const [description, setDescription] = useState("아이템 소개");
  const [author, setAuthor] = useState("");
  const [authorAdr, setAuthorAdr] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [contract, setContract] = useState("");
  const symbol = "SSF";
  const [price, setPrice] = useState("0");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");
  const [proposer, setProposer] = useState("");
  const [balance, setBalance] = useState("0");
  const [uri, setUri] = useState("");
  const [isCollection, setIsCollection] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const currentTime = parseInt((moment() / 1000).toFixed(0));
  const [endDate, setEndDate] = useState("0");
  const [ended, setEnded] = useState("");
  const [saleYn, setSaleYn] = useState(true);

  // [변수] 즉시 구매 모달 (모달, 지갑 주소, 개인키, 로딩)
  const [instantModal, setInstantModal] = useState(false);
  const [address, setAddress] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [loading, setLoading] = useState(false);

  // [변수] 새로운 금액 제안 모달 (모달)
  const [proposeModal, setProposeModal] = useState(false);

  // Web3
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_ETHEREUM_RPC_URL));

  /**
   * [초기 데이터 설정]
   * 화면 첫 렌더링시 판매되고 있는 작품 상세 정보를 조회합니다.
   */
  useEffect(() => {
    getItemDetail();
  }, []);

  // 모달 핸들링 (즉시 구매)
  const toggleInstant = () => {
    setAddress("");
    setBalance("0");
    setPrivKey("");
    setInstantModal(!instantModal);
  };

  // 지갑 주소 입력 핸들링
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setBalance("0");
  };

  // 개인키 입력 핸들링
  const handlePriv = (e) => {
    setPrivKey(e.target.value);
  };

  // 모달 핸들링 (금액 제안)
  const toggleModal = () => {
    setAddress("");
    setBalance("0");
    setPrivKey("");
    setProposeModal(!proposeModal);
  };

  // 타이핑 헬퍼
  const typeSchema = Yup.object().shape({
    price: Yup.number().positive().integer().required(),
  });

  // 입력 데이터 (즉시 구매, 금액 제안) 처리
  const formik = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema: typeSchema,
    onSubmit: () => {},
  });
  const { getFieldProps } = formik;

  /**
   * PJT Ⅱ - 과제 2: 작품 조회
   * Req. 2-F3 작품 상세 조회
   *
   * token id로 작품의 상세 정보를 조회합니다.
   * 작품의 tokenURI를 NFT로부터 직접 조회합니다.
   *
   * PJT Ⅲ - 과제 2: 작품 판매 등록
   * Req. 2-F3 작품 상세 화면 수정
   *
   * 작품의 판매 등록 여부에 따라 sale 컨트랙트를 호출할 수 있는 버튼
   * (제안하기, 구매하기)이 추가되어야 합니다.
   *
   */
  const getItemDetail = async () => {
    // TODO
    // setIsCollection(false);

    try {
      setIsComplete(false);

      var resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + `/items/${tokenId}`);
      const item = resp.data.item;

      setItemName(item.item_title);
      setDescription(item.item_description);
      setAuthor(item.author_name);
      setAuthorAdr(item.owner_address);
      setSaleYn(item.on_sale_yn === "1");

      // comm. with contract
      const ssafyNft = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.NFT_ABI, process.env.REACT_APP_NFT_CA);

      const URI = await ssafyNft.methods.tokenURI(tokenId).call();
      console.log("Got URI --------------------", URI);

      setItem(URI);
      setUri(URI);

      setIsCollection(true);

      // if this token is on sale
      if (item.on_sale_yn === "1") {
        var resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + `/sales?token_id=${tokenId}`);
        if (resp.data.result !== "success") {
          console.log("Could not get sale information");
          return;
        }

        const sale = resp.data.data;

        const saleContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.SALE_ABI, sale.sale_contract_address);
        console.log("saleContract address - ", sale.sale_contract_address, saleContract._address);
        const saleInfo = await saleContract.methods.getSaleInfo().call();
        console.log("saleInfo : ", saleInfo);
        /**
         * [0] : saleStartTime
         * [1] : saleEndTime
         * [2] : minPrice
         * [3] : purchasePrice
         * [4] : tokenId
         * [5] : highestBidder
         * [6] : highetBid
         * [7] : currencyAddress
         * [8] : nftAddress
         */

        setDueDate(sale.completed_at); // 전시 종료
        setContract(sale.cash_contract_address); // 거래 가능 토큰
        setPrice(saleInfo[3]); // 즉시 구매가
        setMinPrice(saleInfo[2]); // 최소 제안가
        setMaxPrice(saleInfo[6]); // 최고 제안가
        setProposer(saleInfo[5]); // 최고 제안자
        setEndDate(parseInt(saleInfo[1])); // currentTime <= endDate
        setEnded(sale.sale_yn !== 1); // && ended === false
      }
    } catch (err) {
      console.log(err);
      setIsCollection(false);
    }
  };

  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req. 3-F1 제안하기
   *
   * 1. bid 컨트랙트 함수 호출 파라메터를 지정합니다.
   * 2. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다. (approveERC20Token() 호출)
   * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
   */
  const checkBalance = async () => {
    if (address === "") {
      alert("먼저 지갑 주소를 입력하세요.");
      return;
    }
    if (!address.startsWith("0x")) {
      alert("올바른 형태의 지갑 주소를 입력하세요.");
      return;
    }

    const ssafyToken = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.ERC_ABI, contract);
    await ssafyToken.methods
      .balanceOf(address)
      .call()
      .then((result) => setBalance(result))
      .catch((err) => console.log("ssafyToken balanceOf error", err));
  };

  const checkAddress = async (address, privKey, method) => {
    // method === "purchase" : 즉시 구매
    // method === "propose" : 제안 구매

    // console.log(address === "");
    // console.log(privKey === "");
    // console.log(method === "propose");

    if (address === "") {
      alert("지갑 주소를 입력해야 합니다.");
      return;
    }
    if (privKey === "") {
      alert("개인키를 입력해야 합니다.");
      return;
    }

    var balance = parseInt(balance);
    var minPrice = parseInt(minPrice);
    var price = parseInt(price);

    if ((method === "propose" && balance < minPrice) || (method === "purchase" && balance < price)) {
      alert("잔액을 조회해야 합니다. 또는 잔액이 부족합니다.");
      return;
    }

    // check account <> address
    const sender = web3.eth.accounts.privateKeyToAccount(privKey);
    if (address != sender.address) {
      alert("잔액을 조회한 계정의 개인키가 아닙니다.");
      return;
    }

    // finally become able to bid
    // alert("Let's go to bid!");
    // console.log("제안 금액 : ", getFieldProps("price").value);
    if (method === "propose") tryBid(sender);
    else if (method === "purchase") tryPurchase(sender);
  };

  const tryBid = async (sender) => {
    // TODO
    // setLoading(false);

    try {
      web3.eth.accounts.wallet.add(sender);
      web3.eth.defaultAccount = sender.address;
      const senderAddress = sender.address;

      // get sale information & set contracts
      var resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + `/sales?token_id=${tokenId}`);

      const sale = resp.data.data;

      const saleContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.SALE_ABI, sale.sale_contract_address);
      const ssafyTokenContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.ERC_ABI, sale.cash_contract_address);

      // * 1. bid 컨트랙트 함수 호출 파라메터를 지정합니다.
      const bid_amount = getFieldProps("price").value;
      // * 2. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다. (approveERC20Token() 호출)
      await ssafyTokenContract.methods
        .approve(saleContract._address, bid_amount)
        .send({ from: senderAddress, gas: 3000000 })
        .then((result) => console.log("ssafyTokenContract approve result", result))
        .catch((err) => console.log("Error while ssafyTokenContract approve", err));

      await saleContract.methods
        .bid(bid_amount)
        .send({ from: senderAddress, gas: 3000000 })
        .then((result) => {
          console.log("saleContract bid result", result);
          setIsComplete(true);
        })
        .catch((err) => console.log("Error while bid", err));
    } catch (err) {
      console.log("Error while tryBid", err);
    }
  };

  /**
   * PJT Ⅲ - 과제 3: 거래 진행
   * Req. 3-F2 구매하기
   *
   * 1. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다.
   * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
   * 3. 정상 호출 후 buyer 정보를 백엔드에 업데이트합니다.
   */
  const tryPurchase = async (sender) => {
    // TODO
    // setLoading(false);

    // * 1. Sale 컨트랙트가 구매자의 SSAFY 토큰을 상대방에게 전송할 수 있는 권한을 부여합니다.
    var resp = await axios.get(process.env.REACT_APP_BACKEND_HOST_URL + `/sales?token_id=${tokenId}`);

    const sale = resp.data.data;
    const saleContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.SALE_ABI, sale.sale_contract_address);
    const ssafyTokenContract = new web3.eth.Contract(COMMON_ABI.CONTRACT_ABI.ERC_ABI, process.env.REACT_APP_ERC20_CA);
    await ssafyTokenContract.methods
      .approve(saleContract._address, price)
      .send({ from: sender.address, gas: 3000000 })
      .then((result) => console.log("ssafyTokenContract approve result", result))
      .catch((err) => console.log("ssafyTokenContract approve error", err));

    // * 2. 정상 호출 후, Sale 컨트랙트의 purchase() 함수를 호출합니다.
    await saleContract.methods
      .purchase()
      .send({ from: sender.address, gas: 3000000 })
      .then((result) => console.log("saleContract purchase result", result))
      .catch((err) => console.log("saleContract purchase error", err));

    // * 3. 정상 호출 후 buyer 정보를 백엔드에 업데이트합니다.
    await saleContract.getPastEvents("SaleEnded", { fromBlock: "latest" }).then(async (events) => {
      console.log("event SaleEnded", events);
      const evt = events[0];
      const buyer = evt.returnValues.winner;
      await axios
        .patch(process.env.REACT_APP_BACKEND_HOST_URL + `/sales/${tokenId}/purchase`, { buyer_address: buyer })
        .then((result) => {
          console.log("buyer patch result", result);
          setIsComplete(true);
        })
        .catch((err) => console.log("buyer patch error", err));
    });
  };

  return (
    <Page title="SSAFY NFT" maxWidth="100%" minHeight="100%">
      {isCollection === true ? (
        <>
          {isComplete === false ? (
            <>
              <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                <Stack width="25%">
                  <Card>
                    <Box sx={{ pt: "100%", position: "relative" }}>
                      <ImgStyle src={item.length !== 0 ? item : null} />
                    </Box>
                    <Divider />
                    <Stack spacing={2}>
                      <Typography variant="h4" sx={{ pt: 3, pl: 3, pr: 3 }}>
                        {itemName}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", p: 3 }}>{description}</Typography>
                    </Stack>
                  </Card>
                </Stack>

                <Stack sx={{ ml: 10 }} width="50%">
                  <Card>
                    <CardHeader sx={{ ml: 1, mb: 2 }} title="작품 정보" />
                    <Divider />
                    <CardContent sx={{ ml: 1, mr: 1, pt: 4 }}>
                      <Stack direction="row">
                        <Typography sx={{ fontSize: 18 }}>작품 이름 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {itemName}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 3 }}>
                        <Typography sx={{ fontSize: 18 }}>작가명 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {author}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 3, mb: 4 }}>
                        <Typography sx={{ fontSize: 18 }}>설명 : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {description}
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ mt: 3, mb: 4 }}>
                        <Typography sx={{ fontSize: 18 }}>TokenURI : </Typography>
                        <Typography sx={{ ml: 1 }} variant="h6">
                          {uri}
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack direction="row" sx={{ mt: 4 }}>
                        <Typography sx={{ fontSize: 18 }}>소유자 : </Typography>
                        <Typography sx={{ ml: 1, mr: 2 }} variant="h6">
                          {authorAdr}
                        </Typography>
                        {authorAdr.length !== 0 ? (
                          <Link underline="none" to={`/whosart/${authorAdr}`} component={RouterLink}>
                            (콜렉션 보기)
                          </Link>
                        ) : null}
                      </Stack>
                      {saleYn === true ? (
                        <>
                          <Stack direction="row" sx={{ mt: 3 }}>
                            <Typography sx={{ fontSize: 18 }}>전시 종료 : </Typography>
                            <Typography sx={{ ml: 1 }} variant="h6">
                              {dueDate}
                            </Typography>
                          </Stack>
                          <Stack direction="row" sx={{ mt: 3, mb: 4 }}>
                            <Typography sx={{ fontSize: 18 }}>거래 가능 토큰 : </Typography>
                            <Typography sx={{ ml: 1 }} variant="h6">
                              {contract}
                            </Typography>
                          </Stack>
                          <Divider />
                          <Stack direction="row" sx={{ mt: 4 }}>
                            <Typography sx={{ fontSize: 18 }}>즉시 구매가 : </Typography>
                            <Typography sx={{ ml: 1 }} variant="h6">
                              {convertToAccountingFormat(price)} {symbol}
                            </Typography>
                          </Stack>
                          <Stack direction="row" sx={{ mt: 3 }}>
                            <Typography sx={{ fontSize: 18 }}>최소 제안가 : </Typography>
                            <Typography sx={{ ml: 1 }} variant="h6">
                              {convertToAccountingFormat(minPrice)} {symbol}
                            </Typography>
                          </Stack>
                          <Stack direction="row" sx={{ mt: 3 }}>
                            <Typography sx={{ fontSize: 18 }}>최고 제안가 : </Typography>
                            <Typography sx={{ ml: 1 }} variant="h6">
                              {convertToAccountingFormat(maxPrice)} {symbol}
                            </Typography>
                          </Stack>
                          <Stack direction="row" sx={{ mt: 3, mb: 4 }}>
                            <Typography sx={{ fontSize: 18 }}>최고 제안자 : </Typography>
                            <Typography sx={{ ml: 1, mr: 2 }} variant="h6">
                              {proposer}
                            </Typography>
                            {proposer.length !== 0 ? (
                              <Link underline="none" to={`/whosart/${proposer}`} component={RouterLink}>
                                (콜렉션 보기)
                              </Link>
                            ) : null}
                          </Stack>

                          <Divider />
                        </>
                      ) : null}

                      {/*
                       * PJT Ⅲ - 과제 3: 거래 진행
                       * 판매 중인 상태인 경우 거래를 위한 버튼을 추가합니다.
                       *
                       * Req. 3-F1 제안하기
                       * Req. 3-F2 구매하기
                       */}
                      {saleYn === true ? (
                        <>
                          {currentTime <= endDate && ended === false ? (
                            <Box sx={{ mt: 5 }}>
                              <Button fullWidth size="large" variant="contained" sx={{ mb: 3, fontSize: 18 }} onClick={toggleInstant}>
                                {convertToAccountingFormat(price)} {symbol} 에 즉시 구매하기
                              </Button>
                              <Button fullWidth size="large" variant="contained" sx={{ mb: 4, fontSize: 18 }} onClick={toggleModal}>
                                새로운 금액 제안하기
                              </Button>

                              <Modal open={instantModal}>
                                <Card
                                  sx={{
                                    width: "40%",
                                    border: 1,
                                    borderRadius: 1,
                                    borderColor: "grey.main",
                                    backgroundColor: "#ffffff",
                                    top: "25%",
                                    left: "30%",
                                  }}
                                >
                                  <Box>
                                    <Typography sx={{ ml: 3, pt: 2 }} variant="h5">
                                      {convertToAccountingFormat(price)} {symbol}에 즉시 구매하기
                                    </Typography>
                                  </Box>
                                  <Divider sx={{ mt: 2 }} />
                                  <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate>
                                      <Box sx={{ mt: 4, ml: 3, mr: 3 }}>
                                        <Stack direction="row" alignItems="center">
                                          <TextField
                                            fullWidth
                                            type="text"
                                            label="내 지갑 주소"
                                            sx={{ mr: 3 }}
                                            onChange={handleAddress}
                                            value={address}
                                          />
                                          <Button size="large" variant="contained" sx={{ width: "20%", fontSize: 16 }} onClick={checkBalance}>
                                            잔액 조회
                                          </Button>
                                        </Stack>
                                        <Stack direction="row" sx={{ mt: 3, ml: 1.5, mr: 1 }} justifyContent="space-between" alignItems="center">
                                          <Typography>내 잔액</Typography>
                                          <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                                            {convertToAccountingFormat(balance)} {symbol}
                                          </Typography>
                                        </Stack>
                                        <Stack direction="row" sx={{ mt: 3 }}>
                                          <TextField fullWidth type="text" label="개인키" onChange={handlePriv} value={privKey} />
                                        </Stack>
                                        <Divider sx={{ mt: 4 }} />
                                        <Stack direction="row" sx={{ mt: 3, mb: 3 }} justifyContent="center">
                                          {loading === false ? (
                                            <Button size="large" variant="contained" sx={{ width: "15%", fontSize: 16 }} onClick={toggleInstant}>
                                              취소
                                            </Button>
                                          ) : null}
                                          <LoadingButton
                                            size="large"
                                            variant="contained"
                                            sx={{ ml: 3, width: "15%", fontSize: 16 }}
                                            loading={loading}
                                            onClick={() => checkAddress(address, privKey, "purchase")}
                                          >
                                            구매하기
                                          </LoadingButton>
                                        </Stack>
                                      </Box>
                                    </Form>
                                  </FormikProvider>
                                </Card>
                              </Modal>

                              <Modal open={proposeModal}>
                                <Card
                                  sx={{
                                    width: "40%",
                                    border: 1,
                                    borderRadius: 1,
                                    borderColor: "grey.main",
                                    backgroundColor: "#ffffff",
                                    top: "20%",
                                    left: "30%",
                                  }}
                                >
                                  <Box>
                                    <Typography sx={{ ml: 3, pt: 2 }} variant="h5">
                                      새로운 금액 제안하기
                                    </Typography>
                                  </Box>
                                  <Divider sx={{ mt: 2 }} />
                                  <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate>
                                      <Box sx={{ mt: 4, ml: 3, mr: 3 }}>
                                        <Stack direction="row" alignItems="center">
                                          <TextField
                                            fullWidth
                                            type="text"
                                            label="내 지갑 주소"
                                            sx={{ mr: 3 }}
                                            onChange={handleAddress}
                                            value={address}
                                          />
                                          <Button size="large" variant="contained" sx={{ width: "20%", fontSize: 16 }} onClick={checkBalance}>
                                            잔액 조회
                                          </Button>
                                        </Stack>
                                        <Stack direction="row" sx={{ mt: 3, ml: 1.5, mr: 1 }} justifyContent="space-between" alignItems="center">
                                          <Typography>내 잔액</Typography>
                                          <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
                                            {convertToAccountingFormat(balance)} {symbol}
                                          </Typography>
                                        </Stack>
                                        <Stack direction="row" sx={{ mt: 3 }}>
                                          <TextField fullWidth type="number" label="제안 금액" {...getFieldProps("price")} />
                                        </Stack>
                                        <Stack direction="row" sx={{ mt: 3 }}>
                                          <TextField fullWidth type="text" label="개인키" onChange={handlePriv} value={privKey} />
                                        </Stack>
                                        <Divider sx={{ mt: 4 }} />
                                        <Stack direction="row" sx={{ mt: 3, mb: 3 }} justifyContent="center">
                                          {loading === false ? (
                                            <Button size="large" variant="contained" sx={{ width: "15%", fontSize: 16 }} onClick={toggleModal}>
                                              취소
                                            </Button>
                                          ) : null}
                                          <LoadingButton
                                            size="large"
                                            variant="contained"
                                            type="submit"
                                            sx={{ ml: 3, width: "15%", fontSize: 16 }}
                                            loading={loading}
                                            onClick={() => checkAddress(address, privKey, "propose")}
                                          >
                                            제안하기
                                          </LoadingButton>
                                        </Stack>
                                      </Box>
                                    </Form>
                                  </FormikProvider>
                                </Card>
                              </Modal>
                            </Box>
                          ) : (
                            <Box sx={{ mt: 5 }}>
                              <Button fullWidth color="inherit" size="large" variant="contained" sx={{ mb: 3, fontSize: 18 }}>
                                {convertToAccountingFormat(price)} {symbol} 에 즉시 구매하기
                              </Button>
                              <Button fullWidth color="inherit" size="large" variant="contained" sx={{ mb: 4, fontSize: 18 }}>
                                새로운 금액 제안하기
                              </Button>
                            </Box>
                          )}
                        </>
                      ) : null}
                    </CardContent>
                  </Card>
                </Stack>
              </Stack>
            </>
          ) : (
            <Container>
              <MotionContainer initial="initial" sx={{ mt: 10 }} open>
                <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
                  <motion.div variants={varBounceIn}>
                    <Typography variant="h3" paragraph>
                      요청 사항 처리 완료
                    </Typography>
                  </motion.div>
                  <Typography sx={{ color: "text.secondary" }}>요청하신 내용이 처리되었습니다.</Typography>

                  <motion.div variants={varBounceIn}>
                    <Box
                      component="img"
                      src="/static/illustrations/illustration_register.png"
                      sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
                    />
                  </motion.div>

                  <Button to="/" size="large" variant="contained" component={RouterLink}>
                    홈으로 돌아가기
                  </Button>
                </Box>
              </MotionContainer>
            </Container>
          )}
        </>
      ) : (
        <Container>
          <MotionContainer initial="initial" sx={{ mt: 10 }} open>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  잘못된 요청입니다.
                </Typography>
              </motion.div>
              <Typography sx={{ color: "text.secondary" }}>해당 아이템을 찾을 수 없습니다.</Typography>

              <motion.div variants={varBounceIn}>
                <Box component="img" src="/static/illustrations/illustration_404.svg" sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }} />
              </motion.div>
            </Box>
          </MotionContainer>
        </Container>
      )}
    </Page>
  );
};

export default ItemPurchase;
