var expect = require("chai").expect;
var rewire = require("rewire");
var order = require("../lib/order");
var sinon = require("sinon");

describe("Ordering cars", function(){
   
    beforeEach(function(){
       this.testData = [
           {code: "AAAA", qty: 10},
           {code: "BBBB", qty: 0},
           {code: "CCCC", qty: 3}
       ];
        
        this.console = {
          log: sinon.spy()  
        };
        
        this.warehouse = {
            //creating a fake tracking number.
            packageAndShip: sinon.stub().yields(1293040)
        };
        
        order.__set__("inventData", this.testData);
        order.__set__("console", this.console);
        order.__set__("warehouse", this.warehouse);
    });
    
    it("order a car when there are enough in stock", function(done){
        
        var _this = this;
        
        order.orderCar = ("CCCC", 3, function(){
            expect(_this.console.log.callCount).to.equal(1);
            done();
            
        });
    });
    
    describe("Warehouse interaction", function(){
       
       beforeEach(function(){
          
          this.callback = sinon.spy();
          order.orderCar("CCCC", 2, this.callback);
       });
        
       it("receives a tracking number", function(){
           expect(this.callback.calledWith(1293040)).to.equal(true);
       });
        
       it("calls packageAndShip with the correct code and quantity", function(){
           expect(this.warehouse.packageAndShip.calledWith("CCCC", 2)).to.equal(true);
       });
    });
    
});