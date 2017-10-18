module.exports = function(RED) {
  
    var Rpc = require('mongoose-os-rpc').Rpc;
  
    function MongooseOsRpcNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        
        this.cfg = config;

        this.rpc = new Rpc({
          address: config.address
        });
        
        this.rpc.on('error', function(err){
          node.status({fill:"red", shape:"dot", text:"Transport error"});
          node.error(err);
        });
        
        this.rpc.on('open', function(err){
          node.status({fill:"green", shape:"dot", text:"Connected"});
        });
        
        this.rpc.on('close', function(err){
          node.status({fill:"red", shape:"dot", text:"Disconnected"});
        });
        
        node.on('input', function(msg) {
          
            var cfg = {
              func: node.cfg.func,
              args: node.cfg.args
            };
            
            if (msg.topic && msg.payload) {
              cfg.func = msg.topic,
              cfg.args = msg.payload
            }
            
            try {
              var args = JSON.parse(cfg.args);
            } catch (e) {
              node.status({fill:"red", shape:"dot", text:"Invalid JSON args"});
              return;
            };
            
            node.status({fill:"blue", shape:"dot", text:"Calling: " + cfg.func});

            node.rpc.call(cfg.func, args, null, function(err, result, tag) {
              if (err) {
                node.status({fill:"red", shape:"dot", text:"Error: " + cfg.func});
                node.error(err.code + ": " + err.message, err);
              } else {
                node.status({fill:"green", shape:"dot", text:"Success: " + cfg.func});
                node.send([{ payload: result }, null]);
              }
            }); 
            
        });
    }
    
    RED.nodes.registerType("mongoose-os-rpc", MongooseOsRpcNode);
}