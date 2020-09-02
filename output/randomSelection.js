let ra = function (n,p,options){
	return new Promise((resolve, reject)=>{
		setTimeout(()=>{resolve('this is ra')},800);
	});
}

module.exports = ra;