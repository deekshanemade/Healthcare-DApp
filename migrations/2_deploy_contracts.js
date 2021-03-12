const CRUD = artifacts.require("CRUD");

module.exports = function (deployer) {
  deployer.deploy(CRUD);
};
