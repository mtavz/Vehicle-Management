var Vehicles = artifacts.require("./Vehicles.sol");

module.exports = function(deployer) {
  deployer.deploy(Vehicles, "0x14cce38d6e09016d328acb13d2710b9fbd2f7ec2");
};
