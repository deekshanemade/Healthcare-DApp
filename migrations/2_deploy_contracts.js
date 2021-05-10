const Healthcare = artifacts.require("Healthcare");

module.exports = function (deployer) {
  deployer.deploy(Healthcare);
};