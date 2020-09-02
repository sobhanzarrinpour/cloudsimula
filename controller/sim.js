let simulate = function (algorithms, Topology,packet,options){
	return new Promise((resolve, reject)=>{
		let out = [];
		algorithms.forEach(alg=>{
			out.push(alg(Topology,packet,options));
		});
		resolve(out);
	});
}

module.exports = simulate;