const MetaNationMarketContract = artifacts.require("MetaNationMarketContract");

module.exports = function (deployer) {
  deployer.deploy(MetaNationMarketContract);
};
