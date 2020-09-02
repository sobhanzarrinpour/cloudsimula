const Filter = require('../controller/filter');

class Application{
	constructor(args = {}){
		if (args.applicaitonName)
			this.applicaitonName = args.applicaitonName;
		else
			this.applicaitonName = "ping";

		if (args.ram)
			this.ram = args.ram;
		else
			this.ram = 256; // MB
		
		if (args.cpu)
			this.cpu = args.cpu; // GHz
		else
			this.cpu = 1.8; // GHz
		
		if (args.hdd)
			this.hdd = args.hdd;
		else
			this.hdd = 0.25; // GB
		
		if (args.applicationState)
			this.applicationState = args.applicationState; // 0 or 1
		else
			this.applicationState = 0;

		if (args.processTime)
			this.applicationProcessTime = args.processTime;
		else
			this.applicationProcessTime = 10;

		if (args.openPorts)
			this.applicationOpenPorts = args.openPorts;
		else
			this.applicationOpenPorts = [];

		if (args.blockPorts)
			this.applicationBlockPorts = args.blockPorts;
		else
			this.applicationBlockPorts = [];

		if (args.delay)
			this.applicationDelay = args.delay;
		else
			this.applicationDelay = 0;

		if (args.securityFilter)
			this.applicationSecurityFilter = args.securityFilter;
		else
			this.applicationSecurityFilter = new Filter();

		if (args.data)
			this.applicationData = args.data;
		else
			this.applicationData = [];

		if (args.listenPorts)
			this.applicationListenPorts = args.listenPorts;
		else
			this.applicationListenPorts = [];

		if (args.MIPS)
			this.applicationMIPS = args.MIPS;
		else
			this.applicationMIPS = 150000;

	}
}

module.exports = Application;