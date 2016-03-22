function shipping(code, qty, callback){
  callback(Math.random());
}

module.exports.packagesAndShip = shipping;