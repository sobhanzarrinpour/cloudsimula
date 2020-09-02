
const Router = require('./controller/router');
const clearTerminal =  require('./utilities/terminal').clearTerminal;
const systemProperties =  require('./utilities/terminal').systemProperties;
const main = require('./output/main');
const Packet = require('./controller/packet');

clearTerminal();
systemProperties();

let userPromptArguments = process.argv.slice(2); // with this code you can handle input arguments in command line

let inputChek = function (userPromptArguments){
	return new Promise((resolve,reject)=>{
		let res = {};
		res.isTopologyPathIsSet = false;
		res.isPacketPathIsSet = false;
		res.topologyPath = '';
		res.packetPath = '';
		for (let i=0;i<userPromptArguments.length-1; i+=2){
			if (userPromptArguments[i]==='--topology' || userPromptArguments[i]==='-T'){
				res.isTopologyPathIsSet = true;
				res.topologyPath = userPromptArguments[i+1];
			}
			if (userPromptArguments[i]==='--packet' || userPromptArguments[i]==='-P'){
				res.isPacketPathIsSet = true;
				res.packetPath = userPromptArguments[i+1];
			}
		}
		resolve(res);
	});
}
inputChek(userPromptArguments)
.then(res=>{
	if(!res.isTopologyPathIsSet && !res.isPacketPathIsSet){
		let router = new Router();
		let packet = new Packet();
		router.init()
		.then(()=>{
			packet.init()
			.then(()=>{
				main(router,packet);
				console.log();
			});
		});
	}else if(res.isTopologyPathIsSet && !res.isPacketPathIsSet){
		let router = new Router(res.topologyPath);
		let packet = new Packet();
		router.init()
		.then(()=>{
			packet.init()
			.then(()=>{
				main(router,packet);
				console.log();
			});
		});
	}else if(!res.isTopologyPathIsSet && res.isPacketPathIsSet){
		let router = new Router();
		let packet = new Packet(res.packetPath);
		router.init()
		.then(()=>{
			packet.init()
			.then(()=>{
				main(router,packet);
				console.log();
			});
		});
	}else {
		let router = new Router(res.topologyPath);
		let packet = new Packet(res.packetPath);
		router.init()
		.then(()=>{
			packet.init()
			.then(()=>{
				main(router,packet);
				console.log();
			});
		});
	}
});


