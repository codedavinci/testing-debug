var inventData = require("../data/inventory");
var warehouse = require("./warehouse");

function findCar(code){
    var car = inventData.map(item => item.sku).indexOf(code);
    if(car === -1){
        console.log(`Car - ${code} not found`);
        return null;
    }else{
        return inventData[car];
    } 
}

function isInStock(code, qty){
    var car = findCar(code);
    return car && car.qty >= qty;
}

function order(code, qty, complete){
    complete = complete || function(){};
    if(isInStock(code, qty)){
        console.log(`ordering ${qty} of car #${code}`);
        warehouse.packagesAndShip(code, qty, function(tracking){
           console.log(`order shipped, tracking - ${tracking}`);
           complete(tracking);
        });
        return true;
    }else{
        console.log(`There are not ${qty} of car '${code}' in stock`);
        return false;
    }
}

module.exports.orderCar = order;