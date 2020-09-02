
const clocks = require('../utilities/terminal').clocks;
const delayCalc = require('../utilities/utilities').delayCalc;


let dijekstra = function(n,p,options){
	return new Promise((resolve, reject)=>{
		let startTime = clocks();
		let bestRoute = {};
		while (clocks()-startTime<options.simTime){
			bestRoute = {
				route: [],
				weight: 100000000,
				hopes: 100000000,
				delay: 100000000
			};
			n.Routes.forEach(route=>{
				if (route.length<bestRoute.weight){
					bestRoute = {
						route,weight:route.length,hopes:route.length-2,delay:delayCalc(route)
					}
				}	
			});
		}

		resolve(bestRoute);
	});
}

module.exports = dijekstra;

