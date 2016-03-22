var expect = require("chai").expect;
var tools = require("../lib/tools");
var nock = require("nock");

describe("tools", function(){
    
    describe("printName", function(){
    it("shall print the last name first", function(){
        var results = tools.printName({first: "Eddie", last: "Henrique"});
        
        expect(results).to.equal("Henrique, Eddie");
      });
    
    });
    
    describe("loadWiki", function(){
        
        before(function(){
            
            nock("https://en.wikipedia.org")
                .get("/wiki/Abraham_Lincoln")
                .reply(200, "Mock Abraham Lincoln page");
        });
       
        it("Loads Abraham Lincoln's wikipedia page", function(done){
            
            tools.loadWiki({first: "Abraham", last: "Lincoln"}, function(html){
                
                expect(html).to.equal("Mock Abraham Lincoln page");
                done();
                
            });
        });
        
    });
    
    
    
});

