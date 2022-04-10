//const Migrations = artifacts.require("Migrations");
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");

/**
 * PJT Ⅰ/Ⅲ - 시나리오 테스트
 * @dev
 * 올바른 테스트를 위해
 * PJT Ⅰ - SsafyNFT
 * PJT Ⅲ - SsafyNFT, SsafyToken, SaleFactory
 * 가 배포되어야 합니다.
 */
module.exports = function (deployer) {
  deployer.deploy(SsafyNFT, { from: "0x32F16B20F56edEDdA93B91B1813bf7b9B56E3121" });
  deployer.deploy(SsafyToken, "SSAFY", "SSF", 0, { from: "0x32F16B20F56edEDdA93B91B1813bf7b9B56E3121" });
  deployer.deploy(SaleFactory, { from: "0x32F16B20F56edEDdA93B91B1813bf7b9B56E3121" });
};
