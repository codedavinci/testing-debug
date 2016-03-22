var https = require("https");

module.exports = {
    
    printName(person){
        return `${person.last}, ${person.first}`;
    },
    
    loadWiki(person, callback){
        
        var url = `https://en.wikipedia.org/wiki/${person.first}_${person.last}`;
        
        https.get(url, function(res){
           var body = "";
            
            res.setEncoding("UTF-8");
            
            res.on("data", function(data){
               body += data; 
            });
            
            res.on("end", function(){
                callback(body);
            });
        });
    }
}