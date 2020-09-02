class Nodes {
	constructor(args = {}){
		if (args.id)
			this.id = args.id;
		else
			this.id = 0;
		if (args.computerName)
			this.computerName = args.computerName;
		else
			this.computerName = "PC1";
		if (args.RAM)
			this.RAM = args.RAM;
		else
			this.RAM = 1024; // MB
		if (args.CPU)
			this.CPU = args.CPU;
		else
			this.CPU = 2.1; // GHz
		if (args.CPU_cores)
			this.CPU_cores = args.CPU_cores;
		else
			this.CPU_cores = 1; 
		if (args.GPU)
			this.GPU = args.GPU;
		else
			this.GPU = 256; // MB
		if (args.HDD)
			this.HDD = args.HDD;
		else
			this.HDD = 1000; // GB
		if (args.LAN)
			this.LAN_BandWidth = args.LAN;
		else
			this.LAN_BandWidth = 0; // Mb
		if (args.WIFI)
			this.WIFI_BandWidth = args.WIFI;
		else
			this.WIFI_BandWidth = 0; // Mb
		if (args.ApplicationList)
			this.ApplicationList = args.ApplicationList;
		else{
			const Application = require('./application')
			this.ApplicationList = [new Application()];
		}
		if (args.OS)
			this.OS = args.OS;
		else
			this.OS = "LINUX"
		if (args.parentId)
			this.parentId = args.parentId;
		else
			args.parentId = [];
		if (args.level)
			this.level = args.level;
		else
			this.level = 0;
		if (args.routingTable)
			this.routingTable = args.routingTable;
		if (args.systemType)
			this.systemType = args.systemType;
		else
			this.systemType = 'pc'

		this.totalCpuPower = this.CPU*this.CPU_cores;
	}	
}

module.exports = Nodes;