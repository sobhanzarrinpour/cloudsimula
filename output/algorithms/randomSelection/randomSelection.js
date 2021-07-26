
const clocks = require('../../../utilities/terminal').clocks;
const delayCalc = require('../../../utilities/utilities').delayCalc;


let ra = function (n,p,options){
	return new Promise(async (resolve, reject)=>{
		let startTime = await clocks();
		let bestRoute = {};
		let simNum = 0;
		let meanSimTime = 0;
		let t = 0;
		let lastSimTime = 0;
		let maxSimTime = 0;
		let minSimTime = 0;
		while (clocks()-startTime<options.simTime){
			await simNum++;

			bestRoute = {
				route: [],
				weight: 100000000,
				hopes: 100000000,
				delay: 100000000
			};
			await n.Routes.forEach(route=>{
				if (route.length<bestRoute.weight){
					bestRoute = {
						route,
						weight:route.length,
						hopes:route.length-2,
						delay:delayCalc(route)	
					}
				}	
			});

			if (meanSimTime === 0) {
				meanSimTime	= await clocks()-startTime;
				lastSimTime	= await meanSimTime;
				minSimTime	= await meanSimTime;
				maxSimTime	= await meanSimTime;
			}
			else{
				t = await clocks()-startTime;
				meanSimTime	= await ((simNum-1) * meanSimTime	+ t - lastSimTime) / simNum;
				minSimTime	= await Math.min(minSimTime , t - lastSimTime);
				maxSimTime	= await Math.max(maxSimTime , t - lastSimTime);
				lastSimTime	= await t;
			}
		}
		bestRoute = await {algName: 'Random Selection' , simNum ,meanSimTime , minSimTime , maxSimTime , ...bestRoute};
		resolve(bestRoute);
	});
}

module.exports = ra;