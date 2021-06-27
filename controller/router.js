const Topology = require('./topologyGenerator');
const os = require('os'); 

let routeGenerator = Symbol();
let Relatins = Symbol();
let routingTableGenerator = Symbol();
let routeCheck = Symbol();
let move = Symbol();

class Router{
	constructor(name='topology.json'){
		let topologyPath = '';
		if(os.platform() === 'windows'){
			topologyPath = `${__dirname}\\..\\topology\\${name}`;
		}else{
			topologyPath = `${__dirname}/../topology/${name}`;
		}
		this.topology = new Topology(topologyPath);
		this.routes = [];
	}

	init(){
		return new Promise((resolve, reject)=>{
			let self = this;
			this.topology.init()
			.then(res=>{
					self[routeGenerator](res)
					.then(res=>{
						self[routingTableGenerator](res)
						.then(res=>{
							self.topology = res;
							resolve(self.topology);
						});
						
					});
					
			})
			.catch(err=>console.error(err));
		});
	}

	[Relatins](topology){
		return new Promise((resolve, reject)=>{
			let Topology = topology;
			Topology.Nodes = [];
			let childs = [];
			let parents = [];
			for(let i=topology.totalLevels;i>0;i--){
				for (let j=0; j<topology.topologyDescription[i-1].length; j++){
					Topology.Nodes.push(topology.topologyDescription[i-1][j]);
				}
			}
			resolve(Topology);
		})
	}

	[routeGenerator](topology){
		return new Promise((resolve, reject)=>{
			this[Relatins](topology)
			.then(res=>{
				let Topology = res;
				for (let i=0;i<Topology.Nodes.length;i++){
					Topology.Nodes[i].uplink = [];
					Topology.Nodes[i].downlink = [];
					Topology.Nodes[i].load = 0;
					for(let j=0;j<Topology.Nodes.length;j++){
						if (i!==j){
							if(Topology.Nodes[i].parentId)
								for (let k=0; k<Topology.Nodes[i].parentId.length;k++)
									if(Topology.Nodes[i].parentId[k]===Topology.Nodes[j].id)
										Topology.Nodes[i].uplink.push(Topology.Nodes[j].id);
							if(Topology.Nodes[j].parentId)
								for (let k=0; k<Topology.Nodes[j].parentId.length;k++)
									if(Topology.Nodes[j].parentId[k]===Topology.Nodes[i].id)
										Topology.Nodes[i].downlink.push(Topology.Nodes[j].id);
							
						}
					}
				}
				resolve(Topology);
			});
			
		});
	}

	[routingTableGenerator](topology){
		return new Promise( (resolve, reject)=>{
			let Topology =  topology;
			Topology.Routes = [];
			let source =  Topology.Nodes.filter(node=>{
				return node.id===Topology.sourceId;
			});
			source =  source[0];
			let destination =  Topology.Nodes.filter(node=>{
				return node.id==Topology.destinationId;
			});
			destination =  destination[0];
			let maxLength = Topology.Nodes.length;
			let route = [];
			let Rs = this[routeCheck](Topology,source,destination,route,maxLength,false);
			Rs.then(res=>{
				Topology.Routes = res;
				resolve(Topology);
			});
		});
	}

	[routeCheck](Topology,source,destination,route,maxLength,isdone){
		return new Promise((resolve, reject)=>{
			while(!isdone){
				if (route.length===0)
					route = [[source]];
				for(let i=0;i<route.length;i++){
					let r =  this[move](Topology,route[i],destination);
					route[i] = r;
				}



				let temp =[];
				for(let i=0;i<route.length;i++)
					for(let j=0;j<route[i].length;j++)
						if (route[i][j].length>0)
							temp.push(route[i][j]);
				route = temp;
				isdone = true;
				for(let i=0;i<route.length;i++){
					if(route[i].length<=maxLength && route[i][route[i].length-1]!==destination){
						isdone = false;
						break;
					}
				}
			}
			

			resolve(route);
		});
	}

	[move](Topology,route,destination){
		let rs = route[route.length-1];
		if (rs.id!==destination.id){
			let links = [];
			for(let i=0;i<rs.uplink.length;i++)
				links.push(rs.uplink[i]);

			for(let i=0;i<rs.downlink.length;i++)
				links.push(rs.downlink[i]);
			let Temp = [];
			for(let i=0;i<links.length;i++){
				let newNode = Topology.Nodes.filter(node=>{return node.id===links[i]});
				newNode = newNode[0];
				let ss = route.filter(node=>{
					return node.id===newNode.id;
				});
				if (ss.length===0)
					Temp.push([...route,newNode]);
			}
			return Temp;
		}else{
			return [route];
		}
	}
}

module.exports = Router;