const MetaNationNFT = artifacts.require("MetaNationNFT");

module.exports = function (deployer) {
  deployer.deploy(MetaNationNFT);
};
