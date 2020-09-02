const Nodes = require('./networkNode');

class PC extends Nodes{
	constructor(...args){
		super(...args);
		this.isShutdown = false;
	}	

	shutdown(){
		this.isShutdown = true;
		console.log(`${this.computerName} is shutdown`);
	}
}

module.exports = PC;