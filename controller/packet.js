const os = require('os'); 

let packetGenerator = Symbol();
class Packet{
	constructor(name='packet.json'){
		if(os.platform() === 'windows'){
			this.path = `${__dirname}\\..\\topology\\${name}`; // for windows
		}
		else{
			this.path = `${__dirname}/../topology/${name}`; // for linux
		}
		this.packets = [];
	}

	init(){
		return new Promise((resolve, reject)=>{
			const packet = require(this.path);
			this[packetGenerator](packet)
			.then(res=>{
				this.packets = res;
				resolve(this.packets);
			});
		})
	}

	[packetGenerator](packet){
		return new Promise((resolve, reject)=>{
			let packets = [];
			for(let i=0;i<packet.numberOfPackets;i++){
				packets.push({
					packetId: i,
					packetSize: packet.packetSize,
					packetTimeout: packet.packetTimeout,
					packetHeader: packet.packetHeader,
					packetExpired: false,
					packetRecieved: false
				});
			}
			resolve(packets);
		});
	}
}

module.exports = Packet;