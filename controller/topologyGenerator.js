const SERVER =  require('../modules/server');
const SWITCH =  require('../modules/switch');
const ROUTER =  require('../modules/router');
const PC =  require('../modules/pc');

let networNodeGenerator = Symbol();



class Topology{
	constructor(topologyPath){
		this.path = topologyPath;
	}

	init(){
		return new Promise((resolve,reject)=>{
			const topology = require(this.path);
			this[networNodeGenerator](topology)
			.then(res=>{
				resolve(res);
			});
		});
	}

	[networNodeGenerator](topology){
		return new Promise((resolve, reject)=>{
			for(let i=topology.totalLevels;i>0;i--){
				for (let j=0; j<topology.topologyDescription[i-1].length; j++){
					let systemType = topology.topologyDescription[i-1][j].computerName.split(/-/);
					systemType = systemType[0];

					switch(systemType){
						case 'Server':{
							topology.topologyDescription[i-1][j].systemType = 'server';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new SERVER(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'Switch':{
							topology.topologyDescription[i-1][j].systemType = 'switch';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new SWITCH(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'Router':{
							topology.topologyDescription[i-1][j].systemType = 'router';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new ROUTER(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'Pc':{
							topology.topologyDescription[i-1][j].systemType = 'pc';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new PC(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'server':{
							topology.topologyDescription[i-1][j].systemType = 'server';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new SERVER(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'switch':{
							topology.topologyDescription[i-1][j].systemType = 'switch';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new SWITCH(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'router':{
							topology.topologyDescription[i-1][j].systemType = 'router';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new ROUTER(topology.topologyDescription[i-1][j]);
							break;
						};
						case 'pc':{
							topology.topologyDescription[i-1][j].systemType = 'pc';
							topology.topologyDescription[i-1][j].LAN_BandWidth = topology.lanSpeed;
							topology.topologyDescription[i-1][j] = new PC(topology.topologyDescription[i-1][j]);
							break;
						};
					}
				}
			}
			
			resolve(topology);
		});
	}
}

module.exports = Topology;