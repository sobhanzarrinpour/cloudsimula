const dijekstra = require('./dijekstra');
const aco = require('./aco');
const ra = require('./randomSelection');
const simulate = require('../controller/sim');

let main = async function (router,packet){
	let output = [];
	let algorithms = [dijekstra ,aco,ra];
	let options = {
		simTime: 10000
	}
	// console.log('Routing Table : \n' , router.topology.Routes);
	console.log('Number of All Posible Routes : ' , router.topology.Routes.length);
	
	await simulate(algorithms ,router.topology,packet, options)
	.then(res=>	output = res);

	output.forEach(out=>{
		out.then(res=>{
			console.log(res);
			if (res.route){
				let node = res.route[0];
				console.log(node.ApplicationList);
			}
		});
	});
}




module.exports = main;