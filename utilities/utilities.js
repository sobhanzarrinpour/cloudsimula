
const os = require('os');

let delayCalc = function(route){
	let delay = 0;
	route.forEach(node=>{
		delay+=node.ApplicationList[0].applicationProcessTime;
	});
	return delay;
}

let log = function(data){
	console.log(os.cpus);
	console.log(os.arch);
}


module.exports = {delayCalc , log};