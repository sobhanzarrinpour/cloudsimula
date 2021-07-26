/* main simulator entry function */
const simulate = require('../controller/sim');

/* Algorithm that we want to use in our simulatiob */
const dijekstra = require('./algorithms/dijekstra/dijekstra');
const aco = require('./algorithms/aco/aco');
const ra = require('./algorithms/randomSelection/randomSelection');

/* your code will go here in "main" function */
let main = async function (router,packet){
	let output = [];
	let algorithms = [dijekstra ,aco,ra];
	let options = {
		simTime: 500
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