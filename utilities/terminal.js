const os = require('os'); 

function clearTerminal(){
	process.stdout.write('\033c');
	process.stdout.write('\033c');
}

function systemProperties(){
	console.log("#############################################################");
	console.log("#############################################################");
	// return the cpu architecture 
	console.log("CPU architecture: " + os.arch()); 
	// It returns the amount of free system memory in bytes 
	console.log("Free memory: " + os.freemem()); 
	// It return total amount of system memory in bytes 
	console.log("Total memory: " + os.totalmem()); 
	// It returns the list of network interfaces 
	console.log('List of network Interfaces: ' + os.networkInterfaces()); 
	// It returns the operating systems default directory for temp files. 
	//console.log('OS default directory for temp files : ' + os.tmpdir ());
	// return the endianness of sytem 
	//console.log("Endianness of system: " + os.endianness()); 
	// It returns hostname of system 
	console.log("Hostname: " + os.hostname()); 
	// It return operating system name 
	console.log("Operating system name: " + os.type()); 
	// It returns the platform of os 
	console.log('operating system platform: ' + os.platform()); 
	// It returns the operating systems release. 
	console.log('OS release : ' + os.release()); 

	console.log("#############################################################");
	console.log("#############################################################");
	console.log();
}

function clocks(){
    let now = new Date();
    //return `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}.${now.getMilliseconds()}`;
    return now.getMilliseconds() + 1000*now.getSeconds() + 60*1000*now.getMinutes() + 60*60*1000*now.getHours();
}

module.exports = {clearTerminal , systemProperties, clocks};
